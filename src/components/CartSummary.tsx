import React from 'react';
import { CartItem } from '../types';
import { fruits } from '../data/fruits';
import { ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, onCheckout }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const fruit = fruits.find(f => f.id === item.fruitId);
      return total + (fruit?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateTotalCalories = () => {
    return cartItems.reduce((total, item) => {
      const fruit = fruits.find(f => f.id === item.fruitId);
      return total + (fruit?.calories || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">購物車摘要</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>購物車是空的</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {cartItems.map((item) => {
              const fruit = fruits.find(f => f.id === item.fruitId);
              if (!fruit) return null;
              return (
                <div key={item.fruitId} className="flex justify-between">
                  <span>{fruit.name}</span>
                  <span>x{item.quantity}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>總金額：</span>
              <span>NT$ {calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-green-600 mt-2">
              <span>總卡路里：</span>
              <span>{calculateTotalCalories()} kcal</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              前往結帳
            </button>
          </div>
        </>
      )}
    </div>
  );
};