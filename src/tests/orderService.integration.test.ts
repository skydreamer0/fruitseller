import { describe, it, expect } from 'vitest'
import { GASOrderService, createOrder } from '../services/orderService'

describe('OrderService Integration Tests', () => {
  const orderService = new GASOrderService()

  // 測試用訂單表單數據
  const testFormData = {
    customerName: '測試用戶',
    phone: '0912345678',
    email: 'test@example.com',
    address: '測試地址 123 號',
    deliveryDate: '2024-03-20',
    deliveryTime: 'morning' as const
  }

  // 測試用購物車項目
  const testCartItems = [
    {
      fruitId: '1',  // 蘋果
      quantity: 2
    },
    {
      fruitId: '2',  // 芒果
      quantity: 1
    }
  ]

  it('應該能成功提交訂單', async () => {
    // 使用 createOrder 函數創建訂單
    const order = createOrder(testFormData, testCartItems)
    console.log('準備提交的訂單數據:', JSON.stringify(order, null, 2))

    try {
      // 提交訂單 - 在 no-cors 模式下，我們只能驗證請求不會拋出錯誤
      await expect(orderService.submitOrder(order)).resolves.not.toThrow()
      console.log('訂單提交成功')
    } catch (error) {
      console.error('測試過程中發生錯誤:', error)
      throw error
    }
  }, 10000)

  it('應該能發送獲取訂單請求', async () => {
    try {
      // 在 no-cors 模式下，我們只能驗證請求不會拋出錯誤
      const orders = await orderService.getOrders()
      console.log('成功發送獲取訂單請求')
      
      // 驗證返回值是數組
      expect(Array.isArray(orders)).toBe(true)
      // 在 no-cors 模式下，我們總是返回空數組
      expect(orders).toEqual([])
    } catch (error) {
      console.error('測試過程中發生錯誤:', error)
      throw error
    }
  }, 10000)
}) 