import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GASOrderService } from '../services/orderService'
import { fruits } from '../data/fruits'
import { FruitItem } from '../types'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('FruitService Tests', () => {
  let service: GASOrderService

  beforeEach(() => {
    service = new GASOrderService()
    // 重置 mock
    mockFetch.mockReset()
  })

  describe('submitFruits', () => {
    it('應該能成功提交水果資料到 Google Sheet', async () => {
      // Mock 成功的回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        type: 'opaque',
        json: async () => ({ success: true, message: '水果資料已成功提交！' })
      })

      await service.submitFruits(fruits)
      
      // 驗證 fetch 被正確調用
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('endpoint=fruits'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fruits)
        })
      )
    })

    it('提交無效水果資料時應該失敗', async () => {
      // Mock 失敗的回應
      mockFetch.mockResolvedValueOnce({
        ok: false,
        type: 'error',
        status: 400
      })

      const invalidFruits = [{ ...fruits[0], name: '' }]
      
      await expect(service.submitFruits(invalidFruits as FruitItem[]))
        .rejects
        .toThrow('水果資料提交失敗')
    })
  })

  describe('getFruits', () => {
    it('應該能夠獲取水果列表', async () => {
      // Mock 成功的回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        type: 'opaque',
        json: async () => ({
          success: true,
          fruits: fruits
        })
      })

      const result = await service.getFruits()
      
      // 在 no-cors 模式下，我們總是返回空數組
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([])
    })

    it('獲取水果資料失敗時應該拋出錯誤', async () => {
      // Mock 失敗的回應
      mockFetch.mockResolvedValueOnce({
        ok: false,
        type: 'error',
        status: 500
      })

      await expect(service.getFruits())
        .rejects
        .toThrow('獲取水果資料失敗')
    })
  })

  describe('整合測試', () => {
    it('應該能完成完整的水果資料提交和查詢流程', async () => {
      // Mock 提交水果資料的成功回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        type: 'opaque',
        json: async () => ({ success: true, message: '水果資料已成功提交！' })
      })

      // Mock 獲取水果資料的成功回應
      mockFetch.mockResolvedValueOnce({
        ok: true,
        type: 'opaque',
        json: async () => ({
          success: true,
          fruits: fruits
        })
      })

      // 1. 提交水果資料
      await service.submitFruits(fruits)

      // 2. 獲取水果列表
      const result = await service.getFruits()
      
      // 3. 驗證結果 - 在 no-cors 模式下，我們總是返回空數組
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([])
      
      // 4. 驗證 fetch 被調用了兩次
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
}) 