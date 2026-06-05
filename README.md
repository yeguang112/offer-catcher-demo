# Offer Catcher Demo

`Offer Catcher` 是一个面向学生求职场景的 AI 智能匹配 Demo，解决两个高频问题：

1. 学生不知道海量岗位里哪些更值得优先投递。
2. 学生不知道自己的简历与目标岗位差在哪、该怎么改。

当前版本是一个 React + Vite 的前端演示版，重点展示：

- 候选人画像抽取后的结构化展示
- 岗位匹配打分与推荐排序
- 针对目标岗位的简历优化建议
- GitHub 与公网部署路径

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址通常为 `http://localhost:5173`。

## 生产构建

```bash
npm run build
npm run preview
```

## 推荐部署

推荐使用 Vercel：

1. 把当前项目推送到 GitHub。
2. 在 Vercel 导入仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。

## 建议仓库结构

```text
offer-catcher-demo/
  src/
  public/
  docs/
  package.json
```

## 交付补齐建议

- Demo：当前网页即可作为可运行交付物
- 方案说明：参考 `docs/offer-catcher-solution.md`
- 选题梳理：参考 `docs/hr-ai-assignments-roadmap.md`
- 视频：录制 2-3 分钟操作演示即可
