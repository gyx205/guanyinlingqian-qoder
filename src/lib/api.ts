import { LingQianData, XianjiParsed } from '@/types';

// 调用灵签 API
export async function fetchLingQian(): Promise<LingQianData> {
  const apiUrl = 'http://124.220.49.230/api/mingli/guanyin.php';
  const params = new URLSearchParams({
    id: process.env.NEXT_PUBLIC_LINGQIAN_API_ID || '10007267',
    key: process.env.NEXT_PUBLIC_LINGQIAN_API_KEY || 'f412cd662f4613e7b3f651bc38094d91'
  });

  try {
    const response = await fetch(`${apiUrl}?${params}`, {
      method: 'GET',
      mode: 'cors',
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
  } catch (error) {
    // 如果 CORS 失败，返回模拟数据作为后备
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('灵签 API 跨域问题，使用模拟数据');
      return getMockLingQianData();
    }
    throw error;
  }
}

// 模拟灵签数据（作为后备）
function getMockLingQianData(): LingQianData {
  const mockData = [
    {
      code: 200,
      xuhao: '第一签',
      gongwei: '上上签',
      qianming: '乔子得伍',
      qianwen: '乔子他日得伍时，大将征西去不迟；南北东西皆已定，老林绿叶发新枝。',
      qianyu: '此卦五谷丰登之象，凡事遇贵人有利也。',
      jieyue: '营谋幸遇明人助，出门遇贵人提携。',
      xianji: '家宅→祈福,自身→吉利,求财→有分,交易→成就,婚姻→成合,六甲→生男,行人→即至,田蚕→大利,六畜→兴旺,寻人→见,公讼→吉,移徙→吉,失物→东北,疾病→作福,山坟→吉',
      diangu: '乔子得伍。春秋时候，齐国的乔子在鮁国做客人。鲁庄公不用礼貌对待他，五月甲申日，鲁庄公去世，世子即位。乔子规勝其他人，得到鲁君的重用。'
    },
    {
      code: 200,
      xuhao: '第二签',
      gongwei: '上签',
      qianming: '东山再起',
      qianwen: '东山耀日升云际，紫鲟烟霄復羻飞；金鸿隐雾日渐高，千里奉朝不算迟。',
      qianyu: '此卦引龙升天之象，凡事有贵人使用也。',
      jieyue: '名利正好逢时至，运去悲来不须疑。',
      xianji: '家宅→古吉,自身→平平,求财→春吉,交易→有利,婚姻→有成,六甲→生男,行人→遥至,田蚕→利,六畜→兴旺,寻人→见,公讼→利,移徙→吉,失物→东北,疾病→设保,山坟→吉',
      diangu: '东山再起。谢安石在东山做寺庙的时候，经常与王羽之等名士一起游山玩水。后来官拜谯议大夫，又出为吴兴太守。'
    }
  ];
  
  // 随机返回一个模拟数据
  return mockData[Math.floor(Math.random() * mockData.length)];
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