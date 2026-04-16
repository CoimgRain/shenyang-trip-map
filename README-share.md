# 沈阳行程网页分享说明

## 当前结构

- `index.html`
- `trip-data.js`
- `scripts/sync-trip-from-obsidian.mjs`
- `assets/trip/`

现在这套分享页已经不是单纯地图页了，而是：

- 地图总览
- D1-D5 切换
- 当天交通建议
- 当天玩法与餐食标签
- 当天照片
- 当天详细说明

网页内容来自知识库里的这份笔记：

- `AI归档/沈阳五一出行安排.md`

也就是说，以后这份笔记改了，网页是可以重新同步刷新的。

## 如何从知识库刷新网页

在仓库目录运行：

```bash
node scripts/sync-trip-from-obsidian.mjs
```

这一步会做两件事：

1. 重新读取知识库里的 `AI归档/沈阳五一出行安排.md`
2. 重新生成 `trip-data.js`，并把引用到的图片复制到 `assets/trip/`

然后如果要让公网链接同步更新，再执行：

```bash
git add index.html trip-data.js scripts/sync-trip-from-obsidian.mjs assets/trip
git commit -m "Refresh trip site from knowledge base"
git push origin main
```

GitHub Pages 会自动刷新网页。

## 分享方式

### 方式 1：直接发网页链接

当前公开链接：

- `https://coimgrain.github.io/shenyang-trip-map/`

优点：别人点开就能看。  
缺点：这是公开链接，里面的行程信息默认也是公开可见的。

### 方式 2：直接发本地网页文件

如果只是临时发给少数人，也可以直接发整个仓库里的静态文件。

优点：不一定非要走公网。  
缺点：对方本地打开时，最好也用一个静态服务器方式预览，体验没有公网链接方便。

## 推荐

如果你想把它当“知识库的可分享前端”，现在这套 `GitHub Pages + 知识库同步脚本` 已经够用了：

- 平时改知识库
- 需要刷新网页时跑一次同步脚本
- 再 push 到 `main`

这样你不用额外部署服务器，也能保留“知识库改了，网页能跟着变”的能力。
