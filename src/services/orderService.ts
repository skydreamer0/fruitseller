// 訂單服務
// 位置：src/services/orderService.ts
// 功能：訂單提交、訂單獲取、水果提交、水果獲取
// 日期：2025-02-04
// 版本：1.0.0

import { OrderInfo, CartItem, CheckoutFormData, FruitItem } from '../types';
import { fruits } from '../data/fruits';

export interface OrderServiceInterface {
  submitOrder: (orderData: OrderInfo) => Promise<void>;
  getOrders: () => Promise<OrderInfo[]>;
  submitFruits: (fruits: FruitItem[]) => Promise<void>;
  getFruits: () => Promise<FruitItem[]>;
}

interface GASResponse {
  error?: string;
  orders?: OrderInfo[];
  fruits?: FruitItem[];
  message?: string;
  success: boolean;
}

// 獲取 GAS Web App URL
const getGASWebAppURL = () => {
  // 檢查是否在 Vite 環境
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GAS_WEB_APP_URL;
  }
  // Node.js 環境
  return process.env.VITE_GAS_WEB_APP_URL;
};

export class GASOrderService implements OrderServiceInterface {
  private async fetchGAS(method: 'GET' | 'POST', endpoint: 'orders' | 'fruits', data?: OrderInfo | FruitItem[]): Promise<GASResponse> {
    try {
      const gasWebAppUrl = getGASWebAppURL();
      if (!gasWebAppUrl) {
        throw new Error('GAS Web App URL 未設置');
      }

      const url = `${gasWebAppUrl}?endpoint=${endpoint}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        mode: 'no-cors',
        credentials: 'omit'
      });

      // 在 no-cors 模式下，我們需要根據 response.type 來判斷請求是否成功
      if (response.type === 'opaque') {
        if (method === 'POST') {
          return { success: true, message: '操作成功' };
        } else {
          return { success: true, orders: [], fruits: [] };
        }
      } else {
        // 根據 endpoint 拋出對應的錯誤
        if (endpoint === 'fruits') {
          throw new Error(method === 'POST' ? '水果資料提交失敗' : '獲取水果資料失敗');
        } else {
          throw new Error(method === 'POST' ? '訂單提交失敗' : '獲取訂單失敗');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;  // 直接拋出原始錯誤
      }
      // 如果不是 Error 實例，創建新的錯誤
      throw new Error('API 請求失敗');
    }
  }

  async submitOrder(orderData: OrderInfo): Promise<void> {
    try {
      // 基本資料驗證
      if (!orderData.id || !orderData.customerName) {
        throw new Error('訂單資料不完整');
      }

      const response = await this.fetchGAS('POST', 'orders', orderData);
      if (!response.success) {
        throw new Error(response.message || '訂單提交失敗');
      }
      console.log('訂單已成功提交');
    } catch (error) {
      console.error('提交訂單時發生錯誤:', error);
      throw error;
    }
  }

  async getOrders(): Promise<OrderInfo[]> {
    try {
      const response = await this.fetchGAS('GET', 'orders');
      if (!response.success) {
        throw new Error(response.message || '獲取訂單失敗');
      }
      return response.orders || [];
    } catch (error) {
      console.error('獲取訂單時發生錯誤:', error);
      throw error;
    }
  }

  async submitFruits(fruitsData: FruitItem[]): Promise<void> {
    try {
      // 基本資料驗證
      if (!Array.isArray(fruitsData) || fruitsData.length === 0) {
        throw new Error('無效的水果資料格式');
      }

      const response = await this.fetchGAS('POST', 'fruits', fruitsData);
      if (!response.success) {
        throw new Error(response.message || '水果資料提交失敗');
      }
      console.log('水果資料已成功提交');
    } catch (error) {
      console.error('提交水果資料時發生錯誤:', error);
      throw error;
    }
  }

  async getFruits(): Promise<FruitItem[]> {
    try {
      const response = await this.fetchGAS('GET', 'fruits');
      if (!response.success) {
        throw new Error(response.message || '獲取水果資料失敗');
      }
      return response.fruits || [];
    } catch (error) {
      console.error('獲取水果資料時發生錯誤:', error);
      throw error;
    }
  }
}

// 建立訂單
export const createOrder = (formData: CheckoutFormData, cartItems: CartItem[]): OrderInfo => {
  const totalAmount = cartItems.reduce((total, item) => {
    const fruit = fruits.find(f => f.id === item.fruitId);
    return total + (fruit?.price || 0) * item.quantity;
  }, 0);

  const totalCalories = cartItems.reduce((total, item) => {
    const fruit = fruits.find(f => f.id === item.fruitId);
    return total + (fruit?.calories || 0) * item.quantity;
  }, 0);

  return {
    id: `ORD${Date.now()}`,
    ...formData,
    items: cartItems,
    totalAmount,
    totalCalories,
    createdAt: new Date().toISOString()
  };
};

// 導出訂單服務實例
export const orderService = new GASOrderService();