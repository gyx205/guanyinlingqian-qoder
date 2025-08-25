'use client';

import { useState } from 'react';
import QuestionInput from '@/components/QuestionInput';
import DrawButton from '@/components/DrawButton';
import LingQianCard from '@/components/LingQianCard';
import AIAnalysis from '@/components/AIAnalysis';
import { LingQianData } from '@/types';

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lingQianData, setLingQianData] = useState<LingQianData | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-chinese-gold/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部标题 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-chinese-red mb-4">
            观音灵签
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            虔诚祈求，智慧指引
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-chinese-gold to-primary-400 mx-auto rounded-full"></div>
        </header>

        {/* 主要内容区域 */}
        <main className="max-w-4xl mx-auto space-y-8">
          {/* 问题输入区域 */}
          <section className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🙏 诚心许愿，输入您的问题
            </h2>
            <QuestionInput 
              question={question}
              onChange={setQuestion}
              disabled={isDrawing}
            />
          </section>

          {/* 抽签按钮 */}
          <section className="text-center">
            <DrawButton
              question={question}
              isDrawing={isDrawing}
              onDrawStart={() => setIsDrawing(true)}
              onDrawComplete={(data) => {
                setLingQianData(data);
                setIsDrawing(false);
                setShowAIAnalysis(false);
              }}
            />
          </section>

          {/* 签牌展示区域 */}
          {lingQianData && (
            <section className="glass-card p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                🎋 您抽到的签文
              </h2>
              <LingQianCard data={lingQianData} />
              
              {/* AI解签按钮 */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAIAnalysis(true)}
                  className="chinese-btn text-lg px-8 py-4"
                  disabled={!question.trim()}
                >
                  <span className="mr-2">🤖</span>
                  AI智能解签
                </button>
                {!question.trim() && (
                  <p className="text-sm text-gray-500 mt-2">
                    请先输入您的问题才能获得AI解签
                  </p>
                )}
              </div>
            </section>
          )}

          {/* AI解签结果 */}
          {showAIAnalysis && lingQianData && (
            <AIAnalysis
              question={question}
              lingQianData={lingQianData}
              onClose={() => setShowAIAnalysis(false)}
            />
          )}
        </main>

        {/* 页脚 */}
        <footer className="text-center mt-16 text-gray-600">
          <p className="text-sm">
            观音灵签仅供参考，人生路需自己走，命运在自己手中
          </p>
          <div className="mt-4 text-xs text-gray-500">
            传统文化 × 现代科技 × 智慧人生
          </div>
        </footer>
      </div>
    </div>
  );
}