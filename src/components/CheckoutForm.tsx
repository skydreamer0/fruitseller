import React from 'react';
import { CheckoutFormData } from '../types';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState<CheckoutFormData>({
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

  // 計算最早可配送日期（隔天開始）
  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
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
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          required
          min={getMinDeliveryDate()}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.deliveryDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
          配送時段
        </label>
        <select
          id="deliveryTime"
          name="deliveryTime"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.deliveryTime}
          onChange={handleChange}
        >
          <option value="morning">上午 (09:00-12:00)</option>
          <option value="afternoon">下午 (14:00-18:00)</option>
        </select>
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