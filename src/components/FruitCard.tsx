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
    e.stopPropagation(); // 防止事件冒泡
    onAdd();
    triggerEmojiAnimation(e);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止事件冒泡
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
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative h-[40vh] md:h-[50vh] min-h-[320px] max-h-[500px] w-full">
        {/* 背景圖片 */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={fruit.image}
            alt={fruit.name}
            className="w-full h-full object-cover"
          />
          {/* 多層漸層效果 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>

        {/* 左側減少按鈕區域 - 整個左半邊可點擊 */}
        <div
          onClick={handleRemove}
          className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer z-10
                     flex items-center px-4 group/minus"
        >
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14
                     flex items-center justify-center rounded-full 
                     bg-white/20 backdrop-blur-sm text-white 
                     group-hover/minus:bg-white/30 transition-all duration-300
                     disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus size={24} className={quantity === 0 ? 'opacity-50' : ''} />
          </motion.div>
        </div>

        {/* 右側增加按鈕區域 - 整個右半邊可點擊 */}
        <div
          onClick={handleAdd}
          className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer z-10
                     flex items-center justify-end px-4 group/plus"
        >
          <motion.div
            className="w-12 h-12 md:w-14 md:h-14
                     flex items-center justify-center rounded-full 
                     bg-orange-500/90 backdrop-blur-sm text-white 
                     group-hover/plus:bg-orange-600/90 transition-all duration-300"
          >
            <Plus size={24} />
          </motion.div>
        </div>

        {/* 頂部名稱區域 */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 
                      bg-gradient-to-b from-black/70 to-transparent">
          <div className="relative flex justify-center items-center overflow-hidden">
            {/* 中文名稱 */}
            <motion.h3 
              initial={{ opacity: 0, x: '50%' }}
              animate={{ opacity: 1, x: '-100%' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // custom bezier curve
                opacity: { duration: 0.3 }
              }}
              className="text-2xl md:text-3xl font-medium text-white whitespace-nowrap"
            >
              {fruit.name}
            </motion.h3>

            {/* 分隔點 */}
            <div className="w-2 h-2 rounded-full bg-white/50 mx-4 shrink-0" />

            {/* 英文名稱 */}
            <motion.p 
              initial={{ opacity: 0, x: '-50%' }}
              animate={{ opacity: 0.9, x: '100%' }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // custom bezier curve
                opacity: { duration: 0.3 }
              }}
              className="text-xl md:text-2xl font-light text-white/90 whitespace-nowrap"
            >
              {fruit.nameEn}
            </motion.p>
          </div>
        </div>

        {/* 中間價格區域 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      px-8 py-4 rounded-xl
                      bg-black/40 backdrop-blur-sm
                      text-center z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-4xl font-medium text-white"
          >
            NT$ {fruit.price}
            <span className="text-sm md:text-base opacity-80 ml-1">/{fruit.unit}</span>
          </motion.div>
        </div>

        {/* 底部資訊區域 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6
                      bg-gradient-to-t from-black/70 to-transparent">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            className="text-sm md:text-base font-light text-white/90 mb-2"
          >
            {fruit.calories} 卡路里/{fruit.unit}
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            className="text-sm md:text-base font-light leading-relaxed 
                       text-white/80 line-clamp-2"
          >
            {fruit.description}
          </motion.p>
        </div>

        {/* 數量指示器 */}
        {quantity > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-4 right-4 
                       w-8 h-8 md:w-10 md:h-10
                       rounded-full bg-orange-500 
                       flex items-center justify-center 
                       text-lg md:text-xl font-medium text-white
                       shadow-lg z-30"
          >
            {quantity}
          </motion.div>
        )}

        {/* Emoji 動畫 */}
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              className="absolute pointer-events-none text-4xl md:text-5xl z-40"
              initial={{ 
                opacity: 1, 
                scale: 0.5,
                x: emojiPosition.x,
                y: emojiPosition.y
              }}
              animate={{ 
                opacity: 0,
                scale: 2,
                y: emojiPosition.y - 100
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              {fruitEmojis[fruit.nameEn] || '🍎'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};