# 沈阳行程地图网页分享说明

## 已生成文件

- `shenyang-trip-map-share.html`

这是一个静态单页网页，打开时会从 CDN 加载 Leaflet，并从高德地图加载底图瓦片。

## 分享方式

### 方式 1：直接发 HTML 文件

把 `shenyang-trip-map-share.html` 发给别人即可。对方双击打开，联网后能看到地图。

优点：不用部署，不公开到网上。  
缺点：不是一个网页链接。

### 方式 2：部署成网页链接

可以部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 等静态网页平台。

优点：别人点链接就能看。  
缺点：如果是公开部署，别人可能看到你的出行日期、地点和路线。

## 推荐

如果只是发给旅游搭子，优先直接发 HTML 或 PNG。

如果确实要公网链接，建议用 GitHub Pages，但最好确认是否接受行程信息公开。
