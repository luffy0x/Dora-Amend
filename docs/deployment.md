# GitHub Pages 部署说明

项目已配置为从 `main` 分支自动构建并发布高保真 Demo，预期访问地址为：

<https://luffy0x.github.io/Dora-Amend/>

## 首次开启

1. 将当前代码提交并推送到 GitHub。
2. 打开仓库的 `Settings`，进入 `Pages`。
3. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
4. 打开仓库的 `Actions` 页面，等待 `Deploy demo to GitHub Pages` 完成。
5. 使用无痕窗口打开线上地址，走完一次黄金路径并检查移动端布局。

之后每次推送到 `main` 都会自动重新部署，也可以在 Actions 页面手动运行工作流。

## 本地模拟 Pages 路径

GitHub Pages 会把仓库部署在 `/Dora-Amend/` 子路径。提交前可以执行：

```bash
GITHUB_ACTIONS=true pnpm build
GITHUB_ACTIONS=true pnpm preview --host 127.0.0.1
```

然后打开：

<http://127.0.0.1:4173/Dora-Amend/>

开发模式仍使用 `http://localhost:5173/`，不会受到线上子路径配置影响。

## 发布检查

- 首页、刷新页面和带 `?study=1` 的研究模式均可打开。
- CSS、JavaScript 和字体资源没有 404。
- 桌面端完成证据、纠正、局部重跑和版本对比流程。
- 375px 宽度下没有横向滚动。
- Actions 日志中没有权限或构建错误。

如果仓库以后改名，需要同步修改 `vite.config.ts` 中的 `/Dora-Amend/`。
