import { OrderInfo, CartItem, CheckoutFormData } from '../types';
import { fruits } from '../data/fruits';

export interface OrderServiceInterface {
  submitOrder: (orderData: OrderInfo) => Promise<void>;
  getOrders: () => Promise<OrderInfo[]>;
}

interface GASResponse {
  error?: string;
  orders?: OrderInfo[];
  message?: string;
  success?: boolean;
}

export class GASOrderService implements OrderServiceInterface {
  private async fetchGAS(method: 'GET' | 'POST', data?: OrderInfo): Promise<GASResponse> {
    try {
      const response = await fetch(import.meta.env.VITE_GAS_WEB_APP_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || '操作失敗');
      }

      return result;
    } catch (error) {
      console.error('API 請求失敗:', error);
      throw error;
    }
  }

  async submitOrder(orderData: OrderInfo): Promise<void> {
    try {
      await this.fetchGAS('POST', orderData);
      console.log('訂單已成功提交');
    } catch (error) {
      console.error('提交訂單時發生錯誤:', error);
      throw new Error('訂單提交失敗');
    }
  }

  async getOrders(): Promise<OrderInfo[]> {
    try {
      const response = await this.fetchGAS('GET');
      return response.orders || [];
    } catch (error) {
      console.error('獲取訂單時發生錯誤:', error);
      throw new Error('獲取訂單失敗');
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