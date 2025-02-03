import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img 
              src={`${import.meta.env.BASE_URL}terroir-fruits-logo.svg`}
              alt="Terroir Fruits Logo" 
              className="h-8"
            />
            <p className="text-gray-600">
              提供最優質的水果，為您的生活增添健康與美味
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">聯絡資訊</h3>
            <p className="text-gray-600">電話：(02) 2345-6789</p>
            <p className="text-gray-600">地址：台北市信義區信義路五段7號</p>
            <p className="text-gray-600">Email：contact@terroirfruits.com</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">營業時間</h3>
            <p className="text-gray-600">週一至週五：09:00 - 21:00</p>
            <p className="text-gray-600">週六至週日：10:00 - 22:00</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600 text-sm">
            <p>© {currentYear} Terroir Fruits. All rights reserved.</p>
            <p className="mt-2">
              "Terroir Fruits" 和相關標誌是 Terroir Fruits 的註冊商標。
              未經授權不得使用。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 