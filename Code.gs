/**
 * 使用繁體中文註解並移除刪除舊數據的邏輯
 */

const SHEET_ID = '1ypJceh2rE5YQXmy3Ihd1W6iOOz75b-SF5Q-I8WMI-H4';
const ORDER_SHEET_NAME = '訂單資料';
const FRUIT_SHEET_NAME = '水果資料';

/**
 * 初始化訂單表頭的獨立函式
 */
function initializeOrderSheetHeaders(sheet) {
  const headers = [
    '訂單ID',
    '客戶名稱',
    '電話',
    '電子郵件',
    '地址',
    '配送日期',
    '配送時段',
    '總金額',
    '總卡路里',
    '訂單項目',
    '建立時間'
  ];
  
  // 設定凍結首行
  sheet.setFrozenRows(1);

  // 設定標題行格式
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]).setBackground('#b7e1cd');
}

/**
 * 初始化水果表頭的獨立函式
 */
function initializeFruitSheetHeaders(sheet) {
  const headers = [
    'ID',
    '名稱',
    '價格',
    '單位',
    '卡路里',
    '圖片URL',
    '描述',
    '更新時間'
  ];
  
  // 設定凍結首行
  sheet.setFrozenRows(1);

  // 設定標題行格式
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]).setBackground('#b7e1cd');
}

/**
 * 取得或建立工作表的函式
 */
function getOrCreateSheet(sheetName, initializeHeaders) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    // 建立新工作表並初始化
    sheet = spreadsheet.insertSheet(sheetName);
    initializeHeaders(sheet);

    // 設定保護防止意外修改表頭
    const protection = sheet.protect().setDescription('表頭保護');
    protection.setUnprotectedRanges([
      sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getMaxColumns())
    ]);
  }
  
  return sheet;
}

/**
 * 處理 POST 請求
 */
function doPost(e) {
  try {
    const endpoint = e.parameter.endpoint;
    const data = JSON.parse(e.postData.contents);

    if (endpoint === 'orders') {
      return handleOrderSubmission(data);
    } else if (endpoint === 'fruits') {
      return handleFruitSubmission(data);
    } else {
      throw new Error('無效的 endpoint');
    }
  } catch(error) {
    return createCorsResponse({
      success: false,
      message: error.toString()
    }, 400);
  }
}

/**
 * 處理訂單提交
 */
function handleOrderSubmission(orderData) {
  const sheet = getOrCreateSheet(ORDER_SHEET_NAME, initializeOrderSheetHeaders);
  
  // 基本資料檢查
  if (!orderData.id || !orderData.customerName) {
    throw new Error('無效的訂單資料');
  }

  // 格式化日期與時間
  const createdAt = new Date(orderData.createdAt).toLocaleString('zh-TW');
  
  sheet.appendRow([
    orderData.id,
    orderData.customerName,
    orderData.phone,
    orderData.email,
    orderData.address,
    Utilities.formatDate(new Date(orderData.deliveryDate), 'Asia/Taipei', 'yyyy/MM/dd'),
    orderData.deliveryTime,
    orderData.totalAmount,
    orderData.totalCalories,
    JSON.stringify(orderData.items),
    createdAt
  ]);

  // 自動調整列寬
  sheet.autoResizeColumns(1, 11);

  return createCorsResponse({
    success: true,
    message: "訂單已成功提交！"
  });
}

/**
 * 處理水果資料提交
 */
function handleFruitSubmission(fruitsData) {
  const sheet = getOrCreateSheet(FRUIT_SHEET_NAME, initializeFruitSheetHeaders);
  
  // 基本資料檢查
  if (!Array.isArray(fruitsData)) {
    throw new Error('無效的水果資料格式');
  }

  // 清除現有資料（除了表頭）
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
  }

  // 添加新資料
  const now = new Date().toLocaleString('zh-TW');
  const fruitRows = fruitsData.map(fruit => [
    fruit.id,
    fruit.name,
    fruit.price,
    fruit.unit,
    fruit.calories,
    fruit.image,
    fruit.description,
    now
  ]);

  if (fruitRows.length > 0) {
    sheet.getRange(2, 1, fruitRows.length, fruitRows[0].length)
      .setValues(fruitRows);
  }

  // 自動調整列寬
  sheet.autoResizeColumns(1, 8);

  return createCorsResponse({
    success: true,
    message: "水果資料已成功更新！"
  });
}

/**
 * 處理 GET 請求
 */
function doGet(e) {
  try {
    const endpoint = e.parameter.endpoint;

    if (endpoint === 'orders') {
      return handleGetOrders();
    } else if (endpoint === 'fruits') {
      return handleGetFruits();
    } else {
      throw new Error('無效的 endpoint');
    }
  } catch(error) {
    return createCorsResponse({
      success: false,
      message: error.toString()
    }, 500);
  }
}

/**
 * 處理獲取訂單列表
 */
function handleGetOrders() {
  const sheet = getOrCreateSheet(ORDER_SHEET_NAME, initializeOrderSheetHeaders);
  const [headers, ...rows] = sheet.getDataRange().getValues();
  
  const orders = rows.map(row => {
    const order = {};
    headers.forEach((header, index) => {
      if (header === '訂單項目') {
        order.items = JSON.parse(row[index] || '[]');
      } else {
        order[header] = row[index];
      }
    });
    return order;
  });

  return createCorsResponse({
    success: true,
    orders: orders
  });
}

/**
 * 處理獲取水果列表
 */
function handleGetFruits() {
  const sheet = getOrCreateSheet(FRUIT_SHEET_NAME, initializeFruitSheetHeaders);
  const [headers, ...rows] = sheet.getDataRange().getValues();
  
  const fruits = rows.map(row => ({
    id: row[0],
    name: row[1],
    price: row[2],
    unit: row[3],
    calories: row[4],
    image: row[5],
    description: row[6],
    updatedAt: row[7]
  }));

  return createCorsResponse({
    success: true,
    fruits: fruits
  });
}

/**
 * 建立統一的 CORS 回應
 */
function createCorsResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Max-Age', '86400');
}

/**
 * 處理 OPTIONS 請求
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
} 