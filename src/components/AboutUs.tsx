import React from 'react';
import { Calendar, Package, Brain, Leaf, ChefHat, BarChart } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] bg-gradient-to-b from-amber-50 to-orange-100">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block">
              <div className="w-20 h-[1px] bg-white/30 mx-auto mb-16" />
              <span className="block text-sm tracking-[0.2em] text-white/70 uppercase mb-8">
                Terroir Fruits
              </span>
              <h1 className="font-serif tracking-wide">
                <span className="block text-2xl md:text-3xl text-white/90 mb-6">
                  法式果物美學
                </span>
                <span className="block text-4xl md:text-5xl text-white font-light mb-12">
                  專屬鮮果管家
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
                源自法語 Terroir 的風土精神
                <br />
                臺灣鮮果與法式優雅的完美結合
              </p>
              <div className="w-20 h-[1px] bg-white/30 mx-auto mt-16" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Brand Statement */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="block text-sm tracking-[0.2em] text-gray-500 uppercase mb-8">
              品牌理念
            </span>
            <h2 className="font-serif">
              <span className="block text-3xl md:text-4xl text-gray-900 font-light mb-4">
                不只是配送水果
              </span>
              <span className="block text-2xl md:text-3xl text-gray-800 font-light">
                為您設計專屬的健康儀式
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                每一盒水果 都是根據您的需求量體裁果
                <br />
                從卡路里計算 營養分析到專屬配送節奏
                <br />
                用科技與美學 重新定義水果攝取的意義
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 客製化 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <ChefHat className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">客製化</h3>
              <ul className="space-y-2 text-gray-600">
                <li>自由組合水果種類/切法</li>
                <li>訂閱制週期配送</li>
              </ul>
            </div>

            {/* 科技賦能 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">科技賦能</h3>
              <ul className="space-y-2 text-gray-600">
                <li>AI卡路里計算器</li>
                <li>AI營養師線上諮詢</li>
                <li>個人化健康數據追蹤</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            你的鮮果管家如何運作？
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Tell Us */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tell Us</h3>
              <p className="text-gray-600">
                從健身控管到下午茶奢享，30秒完成設定
              </p>
            </div>

            {/* We Craft */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">We Craft</h3>
              <p className="text-gray-600">
                12小時內鎖鮮處理，法式分切工藝
              </p>
            </div>

            {/* You Enjoy */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">You Enjoy</h3>
              <p className="text-gray-600">
                每口水果都知道自己為何被吃掉
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            我們把關的，比你想得更多
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-6">每份水果履歷</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <BarChart className="w-6 h-6 text-green-600" />
                  <span>產地溯源</span>
                </div>
                <div className="flex items-center space-x-4">
                  <BarChart className="w-6 h-6 text-green-600" />
                  <span>甜度檢測</span>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">
            讓美好不只留在舌尖
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold">100%可分解材質</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold">每盒減少37%碳足跡</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold">支持小農友善耕作</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 