import { LingQianData, XianjiParsed } from '@/types';

// 调用灵签 API
export async function fetchLingQian(): Promise<LingQianData> {
  const apiUrl = 'http://124.220.49.230/api/mingli/guanyin.php';
  const params = new URLSearchParams({
    id: process.env.LINGQIAN_API_ID || '10007267',
    key: process.env.LINGQIAN_API_KEY || 'f412cd662f4613e7b3f651bc38094d91'
  });

  const response = await fetch(`${apiUrl}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: LingQianData = await response.json();
  
  if (data.code !== 200) {
    throw new Error(data.msg || '获取灵签失败');
  }

  return data;
}

// 解析仙机字符串为结构化数据
export function parseXianji(xianji: string): XianjiParsed {
  const result: Partial<XianjiParsed> = {};
  
  // 按逗号分割，然后解析每个部分
  const parts = xianji.split(',');
  
  parts.forEach(part => {
    const [key, value] = part.split('→');
    if (key && value) {
      const cleanKey = key.trim();
      const cleanValue = value.trim();
      
      // 映射关键词到中文
      const keyMap: { [key: string]: keyof XianjiParsed } = {
        '家宅': '家宅',
        '自身': '自身', 
        '求财': '求财',
        '交易': '交易',
        '婚姻': '婚姻',
        '六甲': '六甲',
        '行人': '行人',
        '田蚕': '田蚕',
        '六畜': '六畜',
        '寻人': '寻人',
        '公讼': '公讼',
        '移徙': '移徙',
        '失物': '失物',
        '疾病': '疾病',
        '山坟': '山坟'
      };
      
      const mappedKey = keyMap[cleanKey];
      if (mappedKey) {
        (result as any)[mappedKey] = cleanValue;
      }
    }
  });
  
  return result as XianjiParsed;
}

// 获取运势等级颜色
export function getLuckColor(gongwei: string): string {
  if (gongwei.includes('上上')) return 'text-red-600';
  if (gongwei.includes('上签')) return 'text-orange-600';
  if (gongwei.includes('中签')) return 'text-yellow-600';
  if (gongwei.includes('下签')) return 'text-gray-600';
  return 'text-gray-500';
}