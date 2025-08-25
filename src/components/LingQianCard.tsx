'use client';

import { useState } from 'react';
import { LingQianData } from '@/types';
import { parseXianji, getLuckColor } from '@/lib/api';

interface LingQianCardProps {
  data: LingQianData;
}

export default function LingQianCard({ data }: LingQianCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const xianji = parseXianji(data.xianji);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 签牌容器 */}
      <div 
        className={`card-flip ${isFlipped ? 'flipped' : ''} cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className="card-flip-inner h-96">
          {/* 正面 - 签文 */}
          <div className="card-front glass-card p-8 flex flex-col justify-between">
            {/* 顶部信息 */}
            <div className="text-center space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-700">
                  {data.xuhao}
                </div>
                <div className={`text-lg font-bold ${getLuckColor(data.gongwei)}`}>
                  {data.gongwei}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-chinese-red border-b-2 border-primary-300 pb-2">
                {data.qianming}
              </h3>
            </div>

            {/* 签文 */}
            <div className="space-y-3 text-center">
              {data.qianwen.split('；').map((line, index) => (
                <p key={index} className="text-lg text-gray-800 leading-relaxed font-medium">
                  {line.trim()}
                </p>
              ))}
            </div>

            {/* 底部提示 */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">
                点击翻转查看解签
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-primary-400 to-chinese-gold rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 背面 - 解签 */}
          <div className="card-back glass-card p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* 标题 */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-chinese-red mb-2">解签详情</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-chinese-gold to-primary-400 mx-auto rounded-full"></div>
              </div>

              {/* 签语 */}
              {data.qianyu && (
                <div className="bg-primary-50/80 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">📜</span>签语
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.qianyu}</p>
                </div>
              )}

              {/* 解曰 */}
              {data.jieyue && (
                <div className="bg-chinese-cream/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span>解曰
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.jieyue}</p>
                </div>
              )}

              {/* 仙机 - 各方面解签 */}
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔮</span>仙机详解
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(xianji).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium text-gray-600">{key}：</span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 典故 */}
              {data.diangu && (
                <div className="bg-primary-50/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">📚</span>典故
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed">{data.diangu}</p>
                </div>
              )}

              {/* 底部提示 */}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">
                  点击翻转查看签文
                </div>
                <div className="flex justify-center">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-primary-400 to-chinese-gold rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 翻转提示 */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          💫 点击签牌可以翻转查看{isFlipped ? '签文' : '详细解签'}
        </p>
      </div>
    </div>
  );
}