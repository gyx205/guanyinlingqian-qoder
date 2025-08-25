# 观音灵签网页应用

## 🙏 项目简介

一个集传统文化与现代科技于一体的在线观音灵签抽取网站，用户可以通过网页端祈福问卦，获得传统签文解读和AI智能解析。

## ✨ 功能特点

- 📝 **问题输入**：支持详细问题描述，提供常见问题模板
- 🎋 **在线抽签**：2秒抽签动画，随机获取观音灵签
- 🃏 **签牌展示**：精美的签牌UI，支持翻转查看详细解签
- 🤖 **AI解签**：集成Deepseek AI，结合用户问题提供个性化解读
- 📱 **响应式设计**：完美适配手机、平板、桌面设备
- 🎨 **中式设计**：淡橙黄主色调，圆角半透明效果

## 🚀 技术栈

- **框架**：Next.js 14.2 (App Router)
- **开发语言**：TypeScript
- **样式**：Tailwind CSS
- **部署**：Vercel (静态导出)
- **API**：灵签API + Deepseek AI

## 📦 安装和运行

1. **克隆项目**
```bash
git clone <your-repo-url>
cd guanyinlingqian-qoder
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **构建生产版本**
```bash
npm run build
```

5. **静态导出**
```bash
npm run export
```

## 🌐 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中连接 GitHub 仓库
3. 配置环境变量（已在 vercel.json 中预设）
4. 自动部署完成

## 🔧 环境变量

```env
LINGQIAN_API_ID=10007267
LINGQIAN_API_KEY=f412cd662f4613e7b3f651bc38094d91
DEEPSEEK_API_KEY=sk-e965f6232d684a2d90192a957d32f6bb
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── ai-analysis/   # AI解签API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页面
├── components/            # React 组件
│   ├── QuestionInput.tsx  # 问题输入组件
│   ├── DrawButton.tsx     # 抽签按钮组件
│   ├── LingQianCard.tsx   # 签牌展示组件
│   └── AIAnalysis.tsx     # AI解签组件
├── lib/                   # 工具函数
│   └── api.ts            # API调用函数
└── types/                 # TypeScript类型定义
    └── index.ts
```

## 🎨 设计规范

### 颜色方案
- **主色调**：淡橙黄色系 (#FFF4E6, #FFE4B5, #FFD700)
- **中式配色**：红色 (#DC143C)、金色 (#FFD700)、米色 (#FFF8DC)

### UI特点
- 圆角设计 (12px)
- 半透明毛玻璃效果
- 流畅的动画过渡
- 中式传统元素融合

## 🔮 API接口

### 灵签API
- **接口地址**：http://124.220.49.230/api/mingli/guanyin.php
- **返回字段**：xuhao(序号)、gongwei(宫位)、qianming(签名)、qianwen(签文)、qianyu(签语)、jieyue(解曰)、xianji(仙机)、diangu(典故)

### AI解签API
- **服务商**：Deepseek
- **模型**：deepseek-chat
- **功能**：结合用户问题和签文内容生成个性化解读

## 📱 响应式设计

- **手机端**：优化触摸操作，简化界面布局
- **平板端**：适中的组件尺寸，保持视觉平衡
- **桌面端**：完整功能展示，丰富的交互效果

## ⚠️ 注意事项

- 签文解读仅供参考，不可完全依赖
- AI解签结合传统文化和现代AI技术，理性看待
- 建议同一问题24小时内只抽一次签
- 保持虔诚和平和的心态

## 📄 开源协议

MIT License

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

---

**观音灵签** - 传统文化 × 现代科技 × 智慧人生