import React, { useState } from 'react';
import { ShoppingBasket, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 shadow-lg relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src={`${import.meta.env.BASE_URL}terroir-fruits-logo.svg`}
              alt="Terroir Fruits Logo" 
              className="h-10"
            />
          </div>
          
          {/* 桌面版導航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">首頁</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">商品</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">關於我們</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">聯絡我們</a>
            <button 
              onClick={onCartClick}
              className="relative focus:outline-none"
            >
              <ShoppingBasket className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

          {/* 手機版選單按鈕和購物車 */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={onCartClick}
              className="relative focus:outline-none"
            >
              <ShoppingBasket className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版滑出選單 */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-orange-500 transition-colors focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col space-y-6">
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              首頁
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              商品
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              關於我們
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              聯絡我們
            </a>
          </nav>
        </div>
      </div>

      {/* 背景遮罩 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};