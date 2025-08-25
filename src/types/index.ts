// 灵签 API 返回数据类型
export interface LingQianData {
  code: number;
  msg?: string;
  xuhao: string;         // 序号，如"五一签"
  gongwei: string;       // 宫位，如"上签子宫"
  qianming: string;      // 签名，如"孔明入川"
  qianwen: string;       // 签文（四句诗文）
  qianyu: string;        // 签语（签文释义）
  jieyue: string;        // 解曰（解签说明）
  xianji: string;        // 仙机（各方面详细解签）
  diangu: string;        // 典故（历史故事）
  img?: string;          // 签文图片地址
}

// 解析后的仙机数据
export interface XianjiParsed {
  家宅: string;
  自身: string;
  求财: string;
  交易: string;
  婚姻: string;
  六甲: string;
  行人: string;
  田蚕: string;
  六畜: string;
  寻人: string;
  公讼: string;
  移徙: string;
  失物: string;
  疾病: string;
  山坟: string;
}

// AI 解签响应类型
export interface AIAnalysis {
  analysis: string;
  success: boolean;
  error?: string;
}

// 用户问题类型
export interface UserQuestion {
  question: string;
  timestamp: number;
}