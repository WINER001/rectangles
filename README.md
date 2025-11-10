# 时间酒楼 Time Inn

围绕“144 个 10 分钟时间块 + 三态 AI 工作流 + 酒楼社区”打造的体验。现在包含：

- `mobile/`：React Native（Expo）iOS 应用，手绘极简风的时间可视化与社区体验。
- `server/`：Fastify + TypeScript 后端 API，负责时间统计、工作流记录、社区内容与 AI 工作流代理。
- `assets/` & `index.html`：原实验页面静态资源，可作为品牌官网或 Web 预览。

## 移动端（Expo）快速开始

```bash
cd mobile
pnpm install # 或 npm install / yarn
pnpm start   # 默认启动 iOS 模拟器预览
```

主要页面：

- 时间主页 `TimeGridScreen`：12x12 时间网格展示（144 个 10 分钟）。
- 三态工作流 `WorkflowScreen`：思考 / 斋戒 / 等待模式 + AI 辅助建议。
- 酒楼社区 `InnSquareScreen`：传闻、悬赏、排行榜。
- 数据集、历史记录、个人中心等支持记录与交易场景。

> 提示：Expo 资源如 `assets/icon.png`、`assets/splash.png` 暂为占位，请替换为实际手绘风素材。

## 后端 API 服务

```bash
cd server
pnpm install
cp .env.example .env   # 如需接入 OpenAI 可填写 API Key
pnpm dev               # 本地端口默认 4000
```

核心接口（全部基于 `http://localhost:4000`）：

- `GET /time/summary`：返回已用/剩余分钟数。
- `POST /workflow/reflection`：保存工作流反思，支持社区分享。
- `POST /ai/workflow`：AI 工作流助手（无 Key 时提供离线建议）。
- `GET /community/rumors` / `bounties` / `leaderboard`：酒楼社区资源。
- `GET /datasets`：社区数据集列表。

服务使用内存数据模拟，可替换为数据库或云存储。

## 架构概览

```
mobile (React Native + Expo)
 ├── src/components    # 手绘风组件：时间网格、模式卡片、AI 面板等
 ├── src/screens       # 时间主页、工作流、社区、数据集、悬赏、历史、个人
 ├── src/services      # API / AI 请求封装
 └── src/hooks         # Zustand 状态、时间网格计算等

server (Fastify + TypeScript)
 ├── src/routes        # time / workflow / community / datasets / ai
 ├── src/services      # 数据存储与 AI 调用封装
 └── src/types         # 共享类型定义
```

## 下一步

- 将内存数据替换为数据库（PostgreSQL、Supabase 等）与对象存储。
- 丰富 AI Prompt 模板与多模型策略，支持多轮对话。
- 实现社区交易（数据集上架、购买）、悬赏协作流程。
- 打磨手绘风视觉资源与动效，完善测试与 CI。
