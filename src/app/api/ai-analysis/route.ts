import { NextRequest, NextResponse } from 'next/server';
import { AIAnalysis } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { question, qianwen, qianyu, jieyue,gongwei } = await request.json();

    if (!question || !qianwen) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    const prompt = `你是一位精通观音灵签解读的大师，请根据用户的问题和抽到的签文，给出详细的解读分析。

用户问题：${question}

签文信息：
- 签文：${qianwen}
- 签语：${qianyu}
- 解曰：${jieyue}
- 签位：${gongwei}

请结合用户的具体问题和签文内容，给出针对性的解读分析，包括：
1. 阅读用户提供的签文和问题，判断签文的整体吉凶，对当前问题的整体分析；
2. 根据签文的象征意义，结合用户的问题，详细解读签文的每一部分；
3. 总结签文的核心意义，给出简洁明了的建议；

要求：
- 语言温和、智慧，体现传统文化的深度
- 针对用户问题给出具体的指导
- 字数控制在300-500字
- 语调积极正面，给予用户信心和方向，但是要客观`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位深谙易理、精通签文解读的大师，对签文的象征意义和背后的文化内涵有着深刻的理解，善于用通俗易懂的语言为人们解惑。'
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

    const result: AIAnalysis = {
      success: true,
      analysis
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('AI Analysis error:', error);
    
    const result: AIAnalysis = {
      success: false,
      error: error instanceof Error ? error.message : '解析失败',
      analysis: ''
    };

    return NextResponse.json(result, { status: 500 });
  }
}