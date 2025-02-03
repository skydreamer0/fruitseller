export interface FruitItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  unit: 'piece' | 'gram';
  calories: number;
  image: string;
  description: string;
}

export interface CartItem {
  fruitId: string;
  quantity: number;
}

export interface OrderInfo {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  deliveryDate: string;
  deliveryTime: 'morning' | 'afternoon';
  items: CartItem[];
  totalAmount: number;
  totalCalories: number;
  createdAt: string;
}

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  deliveryDate: string;
  deliveryTime: 'morning' | 'afternoon';
}