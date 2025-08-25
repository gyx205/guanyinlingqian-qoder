'use client';

import { useState } from 'react';
import { fetchLingQian } from '@/lib/api';
import { LingQianData } from '@/types';

interface DrawButtonProps {
  question: string;
  isDrawing: boolean;
  onDrawStart: () => void;
  onDrawComplete: (data: LingQianData) => void;
}

export default function DrawButton({ 
  question, 
  isDrawing, 
  onDrawStart, 
  onDrawComplete 
}: DrawButtonProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDraw = async () => {
    if (!question.trim()) {
      setError('请先输入您的问题');
      return;
    }

    if (question.trim().length < 5) {
      setError('问题太简短，请详细描述您的疑问');
      return;
    }

    setError(null);
    onDrawStart();

    try {
      // 模拟抽签动画延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = await fetchLingQian();
      onDrawComplete(data);
    } catch (err) {
      console.error('抽签失败:', err);
      setError(err instanceof Error ? err.message : '抽签失败，请重试');
      onDrawComplete({
        code: 400,
        msg: '抽签失败',
        xuhao: '',
        gongwei: '',
        qianming: '',
        qianwen: '',
        qianyu: '',
        jieyue: '',
        xianji: '',
        diangu: ''
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* 抽签按钮 */}
      <div className="relative">
        <button
          onClick={handleDraw}
          disabled={isDrawing || !question.trim()}
          className={`
            relative overflow-hidden
            w-48 h-48 mx-auto
            bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600
            rounded-full shadow-2xl
            text-white font-bold text-xl
            transition-all duration-300
            ${isDrawing 
              ? 'animate-pulse scale-110 shadow-3xl' 
              : 'hover:scale-105 hover:shadow-3xl active:scale-95'
            }
            ${!question.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {/* 按钮背景动画 */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r from-chinese-gold/30 to-primary-300/30
            ${isDrawing ? 'animate-spin' : ''}
          `}></div>
          
          {/* 按钮内容 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {isDrawing ? (
              <>
                <div className="text-3xl mb-2 animate-bounce">🎋</div>
                <div className="text-lg">抽签中...</div>
                <div className="text-sm opacity-80">请稍候</div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🙏</div>
                <div className="text-xl">抽 签</div>
                <div className="text-sm opacity-90">点击求签</div>
              </>
            )}
          </div>

          {/* 光晕效果 */}
          {isDrawing && (
            <div className="absolute inset-0 rounded-full animate-ping bg-primary-400/50"></div>
          )}
        </button>

        {/* 装饰性元素 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className={`
            w-64 h-64 rounded-full border-2 border-primary-300/30
            ${isDrawing ? 'animate-spin' : ''}
          `}></div>
          <div className={`
            absolute top-4 left-4 w-56 h-56 rounded-full border border-chinese-gold/20
            ${isDrawing ? 'animate-spin' : ''}
          `} style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* 抽签说明 */}
      {!isDrawing && (
        <div className="text-center text-gray-600 text-sm max-w-md mx-auto">
          <p className="mb-2">
            请诚心静气，专注于您的问题，然后点击抽签按钮
          </p>
          <p className="text-xs opacity-75">
            观音菩萨慈悲为怀，有求必应
          </p>
        </div>
      )}

      {/* 抽签动画状态提示 */}
      {isDrawing && (
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-600 text-sm">
            观音菩萨正在为您挑选最适合的签文...
          </p>
        </div>
      )}
    </div>
  );
}