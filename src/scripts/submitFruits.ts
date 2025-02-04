// 提交水果數據到 Google Sheet
// 位置：src/scripts/submitFruits.ts
// 功能：提交水果數據到 Google Sheet
// 日期：2025-02-04
// 版本：1.0.0

import { config } from 'dotenv';
import { fruits } from '../data/fruits';
import { orderService } from '../services/orderService';

// 加載環境變數
config({ path: '.env.local' });

// 檢查必要的環境變數
if (!process.env.VITE_GAS_WEB_APP_URL) {
  console.error('錯誤: 未設置 VITE_GAS_WEB_APP_URL 環境變數');
  process.exit(1);
}

async function submitFruitsToSheet() {
  try {
    console.log('開始提交水果數據...');
    console.log('要提交的水果數據:', fruits);
    
    await orderService.submitFruits(fruits);
    console.log('水果數據提交成功！');
    
  } catch (error) {
    console.error('提交水果數據時發生錯誤:', error);
    process.exit(1);
  }
}

// 執行提交
submitFruitsToSheet(); 