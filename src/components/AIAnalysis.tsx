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
        
        // 构建完整的提示词
        const prompt = `你是一位精通观音灵签解读的大师，请根据用户的问题和抽到的签文，给出详细的解读分析。

用户问题：${question}

签文信息：
- 签文：${lingQianData.qianwen}
- 签语：${lingQianData.qianyu}
- 解曰：${lingQianData.jieyue}

请结合用户的具体问题和签文内容，给出针对性的解读分析，包括：
1. 对当前问题的整体分析
2. 签文对此问题的指导意义
3. 具体的建议和注意事项

要求：
- 语言温和、智慧，体现传统文化的深度
- 针对用户问题给出具体的指导
- 字数控制在300-500字
- 语调积极正面，给予用户信心和方向`;

        // 直接调用 Deepseek API
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: '你是一位精通观音灵签解读的大师，擅长结合传统文化智慧为人解惑答疑。'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 800,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`Deepseek API error: ${response.status}`);
        }

        const data = await response.json();
        const analysis = data.choices[0]?.message?.content || '暂无解析';

        const result: AIAnalysisType = {
          success: true,
          analysis
        };
        
        setAnalysis(result);
      } catch (error) {
        console.error('AI分析失败:', error);
        
        // 如果是跨域错误，提供基础解签
        if (error instanceof TypeError && error.message.includes('fetch')) {
          setAnalysis({
            success: true,
            analysis: `根据您抽到的「${lingQianData.qianming}」签：\n\n签文寃意：${lingQianData.qianyu}\n\n解签指导：${lingQianData.jieyue}\n\n针对您的问题“${question}”，这支签提示您要保持耐心和信心，相信好的结果会在适当的时候到来。建议您积极行动，同时遵循自然规律，万事不可急躁。\n\n温馨提示：签文仅供参考，人生道路需要您自己把握。`
          });
        } else {
          setAnalysis({
            success: false,
            error: 'AI解签服务暂时不可用，请查看签文解释',
            analysis: ''
          });
        }
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