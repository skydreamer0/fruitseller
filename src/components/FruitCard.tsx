import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { FruitItem } from '../types';

interface FruitCardProps {
  fruit: FruitItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const FruitCard: React.FC<FruitCardProps> = ({
  fruit,
  quantity,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={fruit.image}
        alt={fruit.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{fruit.name}</h3>
        <p className="text-sm text-gray-600">{fruit.nameEn}</p>
        <p className="text-sm text-gray-500 mt-2">{fruit.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">
            NT$ {fruit.price}/{fruit.unit}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRemove}
              disabled={quantity === 0}
              className="p-1 rounded-full bg-green-100 text-green-600 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={onAdd}
              className="p-1 rounded-full bg-green-100 text-green-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};