import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FruitCard } from './components/FruitCard';
import { CartSummary } from './components/CartSummary';
import { CheckoutForm } from './components/CheckoutForm';
import { fruits } from './data/fruits';
import { CartItem, CheckoutFormData } from './types';
import { createOrder, orderService } from './services/orderService';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getQuantity = (fruitId: string) => {
    const item = cartItems.find(item => item.fruitId === fruitId);
    return item?.quantity || 0;
  };

  const addToCart = (fruitId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.fruitId === fruitId);
      if (existing) {
        return prev.map(item =>
          item.fruitId === fruitId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { fruitId, quantity: 1 }];
    });
  };

  const removeFromCart = (fruitId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.fruitId === fruitId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.fruitId === fruitId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.fruitId !== fruitId);
    });
  };

  const startCheckout = () => {
    setIsCheckingOut(true);
    // 滾動到頁面頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = async (formData: CheckoutFormData) => {
    try {
      const order = createOrder(formData, cartItems);
      await orderService.submitOrder(order);
      
      // 清空購物車並返回商品列表
      setCartItems([]);
      setIsCheckingOut(false);
      
      // 滾動到頁面頂部並顯示成功訊息
      window.scrollTo({ top: 0, behavior: 'smooth' });
      alert('訂購成功！我們會盡快處理您的訂單。');
    } catch (error) {
      console.error('訂購失敗:', error);
      alert('訂購失敗，請稍後再試。');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={scrollToCart}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {isCheckingOut ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">訂購資訊</h2>
                <CheckoutForm
                  onSubmit={handleCheckout}
                  onCancel={() => setIsCheckingOut(false)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fruits.map(fruit => (
                  <FruitCard
                    key={fruit.id}
                    fruit={fruit}
                    quantity={getQuantity(fruit.id)}
                    onAdd={() => addToCart(fruit.id)}
                    onRemove={() => removeFromCart(fruit.id)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="md:col-span-1">
            <div ref={cartRef} className="sticky top-4">
              <CartSummary
                cartItems={cartItems}
                onCheckout={startCheckout}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;