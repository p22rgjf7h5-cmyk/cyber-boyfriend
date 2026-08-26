# 🤖 赛博男友 - Cyber Boyfriend

一个基于 AI 的可定制虚拟男友应用，让你创建独特的数字伴侣。

## ✨ 功能特性

- 🎭 **自定义人设** - 创建独特的角色性格和背景故事
- 💬 **AI 对话** - 基于 OpenAI API 的智能对话系统
- 💝 **情感互动** - 角色会记住你说过的话并作出情感反应
- 🌟 **个性化体验** - 每个男友都有独特的说话风格和性格特征
- 📱 **响应式设计** - 支持网页和移动设备

## 🚀 快速开始

### 前置要求
- Node.js 14+
- npm 或 yarn
- OpenAI API Key

### 安装

```bash
# 克隆仓库
git clone https://github.com/p22rgjf7h5-cmyk/cyber-boyfriend.git
cd cyber-boyfriend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 OpenAI API Key

# 启动应用
npm run dev
```

### 使用

1. 打开浏览器访问 `http://localhost:3000`
2. 点击「创建新男友」
3. 自定义角色的名字、性格、背景故事等
4. 开始与你的 AI 男友聊天！

## 📁 项目结构

```
cyber-boyfriend/
├── public/              # 静态文件
├── src/                 # 前端源代码
│   ├── components/      # React 组件
│   ├── pages/          # 页面
│   ├── styles/         # 样式
│   └── App.js          # 主应用
├── server/             # 后端代码
│   ├── routes/         # API 路由
│   ├── controllers/     # 业务逻辑
│   ├── models/         # 数据模型
│   └── server.js       # 服务器入口
├── package.json        # 项目配置
└── README.md          # 本文件
```

## 🔧 API 端点

### 创建男友
```
POST /api/boyfriends/create
Body: { name, personality, backstory, traits }
```

### 发送消息
```
POST /api/chat
Body: { boyfriendId, message }
```

### 获取男友信息
```
GET /api/boyfriends/:id
```

## 🤝 贡献

欢迎提交 Pull Request！

## 📄 许可证

MIT
