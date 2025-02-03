import React, { useState } from 'react';
import { CheckoutFormData } from '../types';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    deliveryTime: 'morning'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 獲取明天的日期
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // 獲取後天的日期
  const getDayAfterTomorrowDate = () => {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.toISOString().split('T')[0];
  };

  // 獲取星期幾
  const getWeekDay = (dateString: string) => {
    if (!dateString) return '';
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const date = new Date(dateString);
    return weekDays[date.getDay()];
  };

  // 設置快捷日期
  const setQuickDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const dateString = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, deliveryDate: dateString }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          電話
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          pattern="[0-9]{10}"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          電子郵件
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          配送地址
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
          配送日期
        </label>
        <div className="mt-1 space-y-2">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setQuickDate(1)}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            >
              明天
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(2)}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            >
              後天
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              required
              min={getTomorrowDate()}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.deliveryDate}
              onChange={handleChange}
            />
            <span className="text-gray-600">
              {getWeekDay(formData.deliveryDate)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
          配送時段
        </label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, deliveryTime: 'morning' }))}
            className={`py-3 px-4 rounded-md text-sm font-medium transition-colors
              ${formData.deliveryTime === 'morning'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
          >
            上午
            <span className="block text-xs mt-1 opacity-75">
              09:00-12:00
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, deliveryTime: 'afternoon' }))}
            className={`py-3 px-4 rounded-md text-sm font-medium transition-colors
              ${formData.deliveryTime === 'afternoon'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
          >
            下午
            <span className="block text-xs mt-1 opacity-75">
              14:00-18:00
            </span>
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          返回購物
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          確認訂購
        </button>
      </div>
    </form>
  );
};