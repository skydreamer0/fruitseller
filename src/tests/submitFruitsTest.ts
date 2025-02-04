import { fruits } from '../data/fruits';
import { orderService } from '../services/orderService';

async function testSubmitFruits() {
  try {
    console.log('開始提交水果數據...');
    console.log('要提交的水果數據:', JSON.stringify(fruits, null, 2));
    
    await orderService.submitFruits(fruits);
    console.log('水果數據提交成功！');
    
    console.log('嘗試獲取已提交的水果數據...');
    const retrievedFruits = await orderService.getFruits();
    console.log('獲取的水果數據:', JSON.stringify(retrievedFruits, null, 2));
    
  } catch (error) {
    console.error('測試過程中發生錯誤:', error);
  }
}

// 執行測試
testSubmitFruits(); 