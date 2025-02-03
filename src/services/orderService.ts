import { OrderInfo, CartItem, CheckoutFormData } from '../types';
import { fruits } from '../data/fruits';

// 這個介面將來會用於連接 Google Sheets API
export interface OrderServiceInterface {
  submitOrder: (orderData: OrderInfo) => Promise<void>;
  getOrders: () => Promise<OrderInfo[]>;
}

// 模擬訂單服務實現
class MockOrderService implements OrderServiceInterface {
  private orders: OrderInfo[] = [];

  async submitOrder(orderData: OrderInfo): Promise<void> {
    this.orders.push(orderData);
    console.log('Order submitted:', orderData);
    // 這裡將來會改為實際的 Google Sheets API 調用
  }

  async getOrders(): Promise<OrderInfo[]> {
    return this.orders;
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
export const orderService = new MockOrderService();