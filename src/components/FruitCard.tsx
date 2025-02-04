// 水果卡片元件
// 位置：src/components/FruitCard.tsx
// 功能：顯示水果卡片
// 日期：2025-02-04
// 版本：1.0.0

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FruitItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FruitCardProps {
  fruit: FruitItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

// 水果 emoji 映射
const fruitEmojis: { [key: string]: string } = {
  'Apple': '🍎',
  'Mango': '🥭',
  'Strawberry': '🍓',
  'Watermelon': '🍉'
};

export const FruitCard: React.FC<FruitCardProps> = ({
  fruit,
  quantity,
  onAdd,
  onRemove,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });

  const handleAdd = (e: React.MouseEvent) => {
    onAdd();
    triggerEmojiAnimation(e);
  };

  const handleRemove = (e: React.MouseEvent) => {
    if (quantity > 0) {
      onRemove();
      triggerEmojiAnimation(e);
    }
  };

  const triggerEmojiAnimation = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setEmojiPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1000);
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-102"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative aspect-w-4 aspect-h-3">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{fruit.name}</h3>
            <p className="text-sm text-gray-500">{fruit.nameEn}</p>
          </div>
          <div className="text-lg font-bold text-orange-500">
            NT$ {fruit.price}
            <span className="text-sm text-gray-500">/{fruit.unit}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {fruit.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {fruit.calories} 卡路里/{fruit.unit}
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
              disabled={quantity === 0}
            >
              <Minus size={16} />
            </motion.button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showEmoji && (
          <motion.div
            className="absolute pointer-events-none text-2xl"
            initial={{ 
              opacity: 1, 
              scale: 0.5,
              x: emojiPosition.x,
              y: emojiPosition.y
            }}
            animate={{ 
              opacity: 0,
              scale: 1.5,
              y: emojiPosition.y - 50
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {fruitEmojis[fruit.nameEn] || '🍎'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};