import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GASOrderService } from '../services/orderService'
import { OrderInfo, CartItem } from '../types'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('GASOrderService', () => {
  let orderService: GASOrderService

  // 測試用訂單數據
  const mockCartItems: CartItem[] = [
    {
      fruitId: '1',
      quantity: 2
    },
    {
      fruitId: '2',
      quantity: 1
    }
  ]

  const mockOrder: OrderInfo = {
    id: `TEST-${Date.now()}`,
    customerName: '測試用戶',
    phone: '0912345678',
    email: 'test@example.com',
    address: '測試地址 123 號',
    deliveryDate: '2024-03-20',
    deliveryTime: 'morning',
    items: mockCartItems,
    totalAmount: 105,
    totalCalories: 164,
    createdAt: new Date().toISOString()
  }

  beforeEach(() => {
    orderService = new GASOrderService()
    // 重置 mock
    mockFetch.mockReset()
  })

  describe('submitOrder', () => {
    it('應該成功提交訂單到 Google Sheet', async () => {
      // Mock 成功的回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: '訂單已成功提交！' })
      })

      await orderService.submitOrder(mockOrder)
      
      // 驗證 fetch 被正確調用
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        import.meta.env.VITE_GAS_WEB_APP_URL,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockOrder)
        })
      )
    })

    it('提交無效訂單時應該失敗', async () => {
      // Mock 失敗的回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: false, message: '訂單驗證失敗' })
      })

      const invalidOrder = { ...mockOrder, customerName: '' }
      
      await expect(orderService.submitOrder(invalidOrder as OrderInfo))
        .rejects
        .toThrow('訂單提交失敗')
    })
  })

  describe('getOrders', () => {
    it('應該能夠獲取訂單列表', async () => {
      // Mock 成功的回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          orders: [mockOrder]
        })
      })

      const orders = await orderService.getOrders()
      
      expect(Array.isArray(orders)).toBe(true)
      expect(orders.length).toBe(1)
      expect(orders[0]).toEqual(mockOrder)
      
      // 驗證 fetch 被正確調用
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        import.meta.env.VITE_GAS_WEB_APP_URL,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      )
    })

    it('獲取訂單失敗時應該拋出錯誤', async () => {
      // Mock 失敗的回應
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(orderService.getOrders())
        .rejects
        .toThrow('獲取訂單失敗')
    })
  })

  describe('整合測試', () => {
    it('應該能完成完整的訂單提交和查詢流程', async () => {
      // Mock 提交訂單的成功回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: '訂單已成功提交！' })
      })

      // Mock 獲取訂單的成功回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          orders: [mockOrder]
        })
      })

      // 1. 提交訂單
      await orderService.submitOrder(mockOrder)

      // 2. 獲取訂單列表
      const orders = await orderService.getOrders()
      
      // 3. 驗證結果
      expect(orders.length).toBe(1)
      expect(orders[0]).toEqual(mockOrder)
      
      // 4. 驗證 fetch 被調用了兩次
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
}) 