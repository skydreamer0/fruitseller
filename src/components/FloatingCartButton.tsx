// 浮動購物車按鈕元件
// 位置：src/components/FloatingCartButton.tsx
// 功能：顯示浮動購物車按鈕
// 日期：2025-02-04
// 版本：1.0.0

import React from 'react';
import { ShoppingBasket } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ 
  itemCount, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        bg-orange-500 hover:bg-orange-600
        text-white rounded-full p-4
        shadow-lg hover:shadow-xl
        transform hover:scale-105
        transition-all duration-200
        flex items-center justify-center
        ${itemCount > 0 ? 'animate-bounce' : ''}
      `}
      aria-label="購物車"
    >
      <ShoppingBasket className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="
          absolute -top-2 -right-2
          bg-red-500 text-white
          rounded-full w-6 h-6
          flex items-center justify-center
          text-sm font-bold
          animate-pulse
        ">
          {itemCount}
        </span>
      )}
    </button>
  );
}; 