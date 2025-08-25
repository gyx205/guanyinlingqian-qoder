'use client';

import { useState } from 'react';

interface QuestionInputProps {
  question: string;
  onChange: (question: string) => void;
  disabled?: boolean;
}

export default function QuestionInput({ question, onChange, disabled = false }: QuestionInputProps) {
  const [charCount, setCharCount] = useState(question.length);
  const maxLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onChange(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={question}
          onChange={handleChange}
          disabled={disabled}
          placeholder="请输入您想要询问的问题，例如：事业发展、感情婚姻、健康平安等..."
          className={`
            w-full h-32 px-4 py-3 
            bg-white/70 backdrop-blur-sm
            border-2 border-primary-200 rounded-chinese
            focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200
            placeholder-gray-500 text-gray-800
            resize-none transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-300'}
          `}
          rows={4}
        />
        
        {/* 字数统计 */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {charCount}/{maxLength}
        </div>
      </div>

      {/* 温馨提示 */}
      <div className="bg-primary-50/80 backdrop-blur-sm border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">💡</span>
          温馨提示
        </h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 请以虔诚的心情提出您的问题</li>
          <li>• 问题越具体，解签越精准</li>
          <li>• 同一问题24小时内建议只抽一次签</li>
          <li>• 保持平和心态，理性看待签文指引</li>
        </ul>
      </div>

      {/* 快捷问题模板 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">常见问题模板：</h4>
        <div className="flex flex-wrap gap-2">
          {[
            '我的事业发展如何？',
            '感情婚姻何时有结果？',
            '健康方面需要注意什么？',
            '财运如何？投资是否顺利？',
            '学业考试能否成功？',
            '出行是否平安？'
          ].map((template, index) => (
            <button
              key={index}
              onClick={() => onChange(template)}
              disabled={disabled}
              className={`
                text-xs px-3 py-1 rounded-full border border-primary-300
                ${disabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/70 text-primary-700 hover:bg-primary-100 hover:border-primary-400'
                }
                transition-all duration-200
              `}
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}