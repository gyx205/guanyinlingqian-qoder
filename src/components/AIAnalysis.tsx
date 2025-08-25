'use client';

import { useState, useEffect } from 'react';
import { LingQianData, type AIAnalysis as AIAnalysisType } from '@/types';

interface AIAnalysisProps {
  question: string;
  lingQianData: LingQianData;
  onClose: () => void;
}

export default function AIAnalysis({ question, lingQianData, onClose }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<AIAnalysisType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            qianwen: lingQianData.qianwen,
            qianyu: lingQianData.qianyu,
            jieyue: lingQianData.jieyue,
          }),
        });

        const result: AIAnalysisType = await response.json();
        setAnalysis(result);
      } catch (error) {
        console.error('AI分析失败:', error);
        setAnalysis({
          success: false,
          error: '网络连接失败，请重试',
          analysis: ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [question, lingQianData]);

  return (
    <div className="glass-card p-8 relative">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
        aria-label="关闭"
      >
        <span className="text-gray-600">✕</span>
      </button>

      {/* 标题 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span className="mr-3">🤖</span>
          AI智能解签
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-chinese-gold mx-auto rounded-full"></div>
      </div>

      {/* 问题回顾 */}
      <div className="bg-primary-50/80 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">❓</span>您的问题
        </h3>
        <p className="text-gray-700 text-sm">{question}</p>
      </div>

      {/* 签文信息 */}
      <div className="bg-chinese-cream/50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">🎋</span>抽到的签文
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-600">签名：</span>
            <span className="text-gray-800">{lingQianData.qianming}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">宫位：</span>
            <span className="text-gray-800">{lingQianData.gongwei}</span>
          </div>
        </div>
      </div>

      {/* AI分析结果 */}
      <div className="bg-white/80 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">✨</span>AI智能分析
        </h3>
        
        {loading ? (
          <div className="space-y-4">
            {/* 加载动画 */}
            <div className="flex items-center justify-center py-8">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm">
              AI大师正在结合您的问题和签文进行深度分析，请稍候...
            </p>
            
            {/* 模拟分析步骤 */}
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                分析问题类型和核心关切
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                解读签文寓意和历史典故
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                结合传统智慧生成个性化指导
              </div>
            </div>
          </div>
        ) : analysis ? (
          <div>
            {analysis.success ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gradient-to-r from-primary-50 to-chinese-cream/30 rounded-lg p-4 border-l-4 border-primary-400">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {analysis.analysis}
                  </p>
                </div>
                
                {/* 温馨提醒 */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                    <span className="mr-2">⚠️</span>温馨提醒
                  </h4>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    AI解签仅供参考，不可尽信。人生的方向需要您自己把握，命运掌握在自己手中。
                    建议结合实际情况理性分析，积极面对生活中的挑战和机遇。
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">😔</div>
                <h4 className="font-medium text-gray-800 mb-2">分析失败</h4>
                <p className="text-gray-600 text-sm mb-4">
                  {analysis.error || 'AI分析服务暂时不可用'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  重新尝试
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}