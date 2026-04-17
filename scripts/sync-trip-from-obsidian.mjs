import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = "/Users/kang/Downloads/沈阳行程地图分享";
const vaultRoot = "/Users/kang/Library/Mobile Documents/iCloud~md~obsidian/Documents/KK个人知识库";
const sourceNote = "AI归档/沈阳五一出行安排.md";
const sourcePath = path.join(vaultRoot, sourceNote);
const assetDir = path.join(repoRoot, "assets", "trip");
const outputFile = path.join(repoRoot, "trip-data.js");

const dayMeta = [
  {
    order: 1,
    label: "D1",
    kicker: "市中心轻量开局",
    title: "到站、放包、中山广场、中山路、西塔",
    shortArea: "中山广场 / 西塔",
    summary: "第一天不要把自己玩散，先把酒店落下来，再用中山广场与中山路建立对沈阳的第一印象，晚上把重头戏留给西塔。",
    crowd: "中到高",
    mood: "轻开局，夜饭拉满",
    color: "#d84f45",
    route: ["沈阳北到站", "太原街 / 沈阳站放包", "中山广场", "中山路", "西塔美食街"],
    transportNote: "第一天优先省脑子：沈阳北到酒店尽量用一段地铁主轴或直接打车；中山路到西塔建议短打车，省换乘。",
    transit: [
      { title: "沈阳北 -> 太原街 / 沈阳站", copy: "优先走地铁 2 号线到青年大街，再换 1 号线去太原街或沈阳站；如果刚到站不想折腾，直接打车最省事。" },
      { title: "酒店 -> 中山广场", copy: "住太原街一带基本可短地铁或短打车解决，先把体力留给下午和晚上。" },
      { title: "中山路 -> 西塔", copy: "建议直接打车 10-15 分钟，比来回找站换线更顺。" }
    ],
    highlights: ["老建筑慢逛", "第一顿别吃太重", "西塔夜饭主场", "拍城市气质而不是网红打卡"],
    food: [
      { label: "西塔冷面", name: "西塔大冷面（市府大路店）", area: "西塔 / 市府大路", url: "https://tw.trip.com/restaurant/china/shenyang/detail/west-tower-cold-noodles-xita-11531945" },
      { label: "西塔烤肉", name: "青瓦餐厅·生鱼片·烤肉（西塔店）", area: "西塔", url: "https://m.dianping.com/shop/563753" },
      { label: "参鸡汤", name: "长寿参鸡汤（西塔店）", area: "西塔 / 珲春路", url: "https://m.dianping.com/shop/4109077" },
      { label: "老式拌饭", name: "松兰味·西塔店", area: "西塔 / 安图街", url: "https://m.dianping.com/shop/22440276" },
      { label: "韩式炸鸡", name: "步乐满饭店", area: "西塔街", url: "https://m.dianping.com/shop/2345278" }
    ],
    points: [
      { name: "中山广场", lat: 41.7944883, lon: 123.4044591 },
      { name: "中山路", lat: 41.7962526, lon: 123.4134458 },
      { name: "西塔美食街", lat: 41.8024443, lon: 123.4024051 }
    ],
    extraPhotos: [
      "系统工具/附件/shenyang-zhongshan-photo.webp",
      "系统工具/附件/shenyang-zhongshan-photo-2.webp",
      "系统工具/附件/shenyang-xita-photo.webp",
      "系统工具/附件/shenyang-xita-photo-2.webp",
      "系统工具/附件/shenyang-xita-photo-3.webp"
    ]
  },
  {
    order: 2,
    label: "D2",
    kicker: "东侧老城经典线",
    title: "小河沿早市、九一八、故宫、方城、老北市",
    shortArea: "小河沿 / 中街方城",
    summary: "第二天走纪念意义最强的一条线：先用小河沿早市把烟火气拉满，再把九一八和故宫这条老城轴串起来，晚上收在老北市。",
    crowd: "高",
    mood: "纪念地标 + 老城主线",
    color: "#e08a1e",
    route: ["小河沿早市", "九一八历史博物馆", "沈阳故宫", "中街 / 方城", "老北市 / 北市场"],
    transportNote: "早市和纪念馆之间尽量用打车切，节省黄金时间；故宫到中街以步行为主，晚上再回老北市。",
    transit: [
      { title: "酒店 -> 小河沿早市", copy: "清晨不建议折腾多次换乘，直接打车过去体验最好。" },
      { title: "小河沿 -> 九一八", copy: "继续打车最顺，能把早市到博物馆之间的时间压到最短。" },
      { title: "故宫 / 中街 -> 老北市", copy: "老城主线结束后再转 1 号线接 2 号线，或者直接打车回老北市，别晚上再绕远路。" }
    ],
    highlights: ["小河沿早点到", "九一八优先级很高", "故宫半天足够", "中街改成 citywalk 玩法"],
    food: [
      { label: "早市包子", name: "小河沿早市早点摊区", area: "小河沿早市", url: "https://tw.trip.com/moments/detail/shenyang-155-127506793/" },
      { label: "冰花煎饺", name: "老边饺子馆（中街店）", area: "中街", url: "https://m.dianping.com/shop/551481" },
      { label: "鸡架抻面", name: "老四季抻面馆（总店）", area: "十三纬路 / 沈河", url: "https://tw.trip.com/restaurant/china/shenyang/detail/LSJ-33323890/" },
      { label: "熏肉大饼", name: "李连贵熏肉大饼总店", area: "中街", url: "https://jp.trip.com/restaurant/china/shenyang/detail/Li%20Lian%20Gui%20Xun%20Rou%20Da%20Bing%20Dian%20%28ShenHe%29-11531947/" },
      { label: "四绝东北菜", name: "宝发园名菜馆", area: "大东 / 小什字街", url: "https://m.dianping.com/shop/551725" }
    ],
    points: [
      { name: "小河沿早市", lat: 41.7896, lon: 123.4695 },
      { name: "九一八历史博物馆", lat: 41.8343719, lon: 123.4617122 },
      { name: "沈阳故宫", lat: 41.7961133, lon: 123.4496439 },
      { name: "中街 / 方城", lat: 41.7989685, lon: 123.4543812 },
      { name: "老北市 / 北市场", lat: 41.8046462, lon: 123.420918 }
    ],
    extraPhotos: [
      "系统工具/附件/shenyang-xiaoheyan-photo.webp",
      "系统工具/附件/shenyang-xiaoheyan-photo-2.webp",
      "系统工具/附件/shenyang-xiaoheyan-photo-3.webp"
    ]
  },
  {
    order: 3,
    label: "D3",
    kicker: "北部生活感慢逛线",
    title: "八一早市、北陵公园、北市场、皇寺路",
    shortArea: "北陵 / 皇寺路",
    summary: "第三天把节奏往下压一档，早市之后去北陵公园缓一缓，下午再切回北市场和皇寺路，重点是生活感，不是冲景点数量。",
    crowd: "中",
    mood: "松弛慢逛",
    color: "#2f9e62",
    route: ["八一早市", "北陵公园", "北市场", "皇寺路"],
    transportNote: "早市到北陵建议靠 2 号线主轴移动；下午北市场和皇寺路本身就适合步行慢逛，不用再折返。",
    transit: [
      { title: "酒店 -> 八一早市", copy: "住太原街一带可直接地铁 + 步行，或者打车抢时间。" },
      { title: "八一早市 -> 北陵公园", copy: "优先往 2 号线方向靠，北陵公园这一段地铁最稳。" },
      { title: "北陵 -> 北市场 / 皇寺路", copy: "下半天尽量留在同一片老城区域，靠步行和短打车衔接即可。" }
    ],
    highlights: ["八一早市更本地", "北陵拿来缓冲体力", "北市场比热闹夜市更适合你们", "晚饭可西塔二刷"],
    food: [
      { label: "早市熟食", name: "八一早市熟食 / 面点摊区", area: "八一早市", url: "https://sg.trip.com/moments/detail/shenyang-155-142530634/" },
      { label: "清真烧麦", name: "马家烧麦馆（长江街店）", area: "北陵 / 北行", url: "https://m.tuniu.com/restaurant/2045573/" },
      { label: "鸡架抻面", name: "盛京老四季抻面馆（九部店）", area: "宁山东路 / 北陵南侧", url: "https://tw.trip.com/restaurant/china/shenyang/detail/LSJ-33323890/" },
      { label: "老北鸡架", name: "真有贺·沈阳鸡架城", area: "老北市 / 皇寺路", url: "https://sg.trip.com/moments/detail/shenyang-155-142530634/" },
      { label: "回民蒸饺", name: "三盛轩回民饺子馆", area: "老城 / 沈河", url: "https://tw.trip.com/restaurant/china/shenyang/detail/San%20Sheng%20Xuan%20HuiMin%20JiaoZi-404527/" }
    ],
    points: [
      { name: "八一早市", lat: 41.8022, lon: 123.4088 },
      { name: "北陵公园", lat: 41.8485259, lon: 123.4246943 },
      { name: "北市场", lat: 41.8067975, lon: 123.4186405 },
      { name: "皇寺路", lat: 41.8049, lon: 123.4116 }
    ],
    extraPhotos: [
      "系统工具/附件/shenyang-laobeishi-photo.webp",
      "系统工具/附件/shenyang-xhs-beishichang.png"
    ]
  },
  {
    order: 4,
    label: "D4",
    kicker: "铁西工业文化线",
    title: "向工早市、1905、工业博物馆、兴顺夜市",
    shortArea: "铁西 / 工业线",
    summary: "第四天整条线都交给铁西：早市打头，1905 做白天主角，下午工业线二选一，晚上用兴顺夜市做最热闹的收尾。",
    crowd: "中到高",
    mood: "工业感 + 烟火气",
    color: "#3478c8",
    route: ["向工早市", "1905 文创园", "红梅文创园 / 工业博物馆", "兴顺夜市"],
    transportNote: "今天核心是区域集中，不要回城里；早市后一路往铁西工业线推进，最后自然落到兴顺夜市。",
    transit: [
      { title: "酒店 -> 向工早市", copy: "清晨直接打车最省事，别把早市体验浪费在换乘上。" },
      { title: "向工 -> 1905", copy: "优先地铁靠近铁西，再补一小段打车，速度和体力最平衡。" },
      { title: "工业线 -> 兴顺夜市", copy: "今天不要折返，白天玩完工业线就直接切到夜市收尾。" }
    ],
    highlights: ["1905 比传统景点更适合你们", "工业博物馆和红梅二选一", "铁西线别塞太满", "夜市重在热闹收尾"],
    food: [
      { label: "向工早餐", name: "向工早市摊区", area: "向工街", url: "https://tw.trip.com/moments/theme/poi-zhongjie-street-99832-restaurant-993134/" },
      { label: "锅包肉", name: "群乐饭店", area: "铁西 / 兴工街", url: "https://tw.trip.com/restaurant/china/shenyang/detail/qunle-restaurant-399548/" },
      { label: "泥炉烤肉", name: "千里马烧烤（贵和街 / 小六路一带）", area: "铁西广场附近", url: "https://tw.trip.com/restaurant/china/shenyang/detail/qianlima-barbecue-xiaoliuluyi-11535186" },
      { label: "夜市大串", name: "527纯手工牛羊肉大串", area: "兴顺夜市", url: "https://ln.cri.cn/2024-03-28/a046e76f-b201-a039-877a-b9bebec96f48.html" },
      { label: "雪绵豆沙", name: "徐老太太雪绵豆沙", area: "兴顺夜市", url: "https://ln.cri.cn/2024-03-28/a046e76f-b201-a039-877a-b9bebec96f48.html" }
    ],
    points: [
      { name: "向工早市", lat: 41.8015, lon: 123.365 },
      { name: "1905 文创园", lat: 41.8158, lon: 123.3748 },
      { name: "中国工业博物馆", lat: 41.81895, lon: 123.3491906 },
      { name: "兴顺夜市", lat: 41.7915247, lon: 123.353206 }
    ],
    extraPhotos: [
      "系统工具/附件/shenyang-1905-photo.webp",
      "系统工具/附件/shenyang-1905-photo-2.webp"
    ]
  },
  {
    order: 5,
    label: "D5",
    kicker: "机动补漏，轻松收尾",
    title: "太原街 / 中山广场机动补漏 + 返程",
    shortArea: "太原街 / 中山路",
    summary: "最后一天不要再压重景点，退房寄存后就围着太原街和中山路做轻量补漏，把最喜欢的地方再走一遍，然后舒服返程。",
    crowd: "中",
    mood: "留白收尾",
    color: "#8a53c6",
    dashed: true,
    route: ["酒店寄存", "太原街", "中山广场 / 中山路", "机动补漏", "返程"],
    transportNote: "最后一天尽量别再跑远，围着太原街、中山路和酒店周边活动，给取包和返程留足余量。",
    transit: [
      { title: "退房后怎么走", copy: "先把包寄在同一家酒店，轻装出门，今天不用再折腾换住宿。" },
      { title: "太原街 -> 中山路", copy: "最后一天这条线适合步行慢逛，必要时补一段短打车就行。" },
      { title: "返程前", copy: "下午早点往酒店回拢，取包后再去车站，别让最后一天变赶路。" }
    ],
    highlights: ["不再开新地图", "补最喜欢的一处就够", "太原街适合收尾午饭", "返程留余量"],
    food: [
      { label: "太原烧麦", name: "马家烧麦馆（太原北街店）", area: "太原街", url: "https://tw.trip.com/restaurant/china/shenyang/detail/majia-shaomai-guan-taiyuan-north-street-387346/" },
      { label: "俄式西餐", name: "欧罗巴（太原街店）", area: "太原街", url: "https://gs.ctrip.com/html5/you/foods/155/15518560.html" },
      { label: "石榴异域", name: "石榴餐厅", area: "中山路欧风街", url: "https://www.sohu.com/a/844987311_121443915" },
      { label: "德式猪肘", name: "卡尼爷爷烤肉餐厅", area: "中山路欧风街", url: "https://cn.tripadvisor.com/Restaurant_Review-g297454-d12329847-Reviews-Carney_s_BBQ_Grill-Shenyang_Liaoning.html" },
      { label: "收尾大饼", name: "李连贵熏肉大饼", area: "太原街 / 返程补漏", url: "https://m.dianping.com/shop/564483" }
    ],
    points: [
      { name: "太原街", lat: 41.7917407, lon: 123.3964233 },
      { name: "中山广场", lat: 41.7944883, lon: 123.4044591 },
      { name: "中山路", lat: 41.7962526, lon: 123.4134458 }
    ],
    extraPhotos: [
      "系统工具/附件/shenyang-zhongshan-photo.webp",
      "系统工具/附件/shenyang-zhongshan-photo-2.webp"
    ]
  }
];

const photoCaptionMap = {
  "shenyang-zhongshan-photo.webp": "中山路街景",
  "shenyang-zhongshan-photo-2.webp": "中山广场周边老建筑",
  "shenyang-xita-photo.webp": "西塔街区夜色",
  "shenyang-xita-photo-2.webp": "西塔美食街氛围",
  "shenyang-xita-photo-3.webp": "西塔夜饭现场",
  "shenyang-xiaoheyan-photo.webp": "小河沿早市入口",
  "shenyang-xiaoheyan-photo-2.webp": "小河沿早市早餐摊位",
  "shenyang-xiaoheyan-photo-3.webp": "小河沿早市烟火气",
  "shenyang-laobeishi-photo.webp": "老北市街区氛围",
  "shenyang-xhs-beishichang.png": "北市场片区参考图",
  "shenyang-1905-photo.webp": "1905 文创园厂房空间",
  "shenyang-1905-photo-2.webp": "1905 文创园局部",
  "shenyang-bajing-photo.webp": "八经咖啡小巷街角",
  "shenyang-bajing-photo-2.webp": "八经咖啡小巷路段",
  "shenyang-bajing-photo-3.webp": "八经片区氛围"
};

function xhsSearchUrl(keyword) {
  return `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}&source=web_explore_feed`;
}

function sliceDaySection(markdown, order) {
  const pattern = new RegExp(`^##\\s+Day\\s+${order}(?:[｜|].*)?$`, "m");
  const match = markdown.match(pattern);
  if (!match) return "";
  const start = match.index + match[0].length;
  const after = markdown.slice(start);
  const nextHeading = after.search(/^##\s+/m);
  return (nextHeading === -1 ? after : after.slice(0, nextHeading)).trim();
}

function collectDaySections(markdown) {
  return dayMeta.map((meta) => {
    const full = sliceDaySection(markdown, meta.order);
    return { ...meta, rawSection: full };
  });
}

function normalizePhotoName(relPath) {
  return path.basename(relPath).replace(/\s+/g, "-");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function buildPhotoCaption(fileName) {
  return photoCaptionMap[fileName] ?? fileName
    .replace(/^shenyang-/, "")
    .replace(/\.(png|webp|jpg|jpeg)$/i, "")
    .replace(/-/g, " ");
}

async function copyPhoto(relPath) {
  const source = path.join(vaultRoot, relPath);
  const name = normalizePhotoName(relPath);
  const dest = path.join(assetDir, name);
  await fs.copyFile(source, dest);
  return {
    src: `assets/trip/${name}`,
    alt: buildPhotoCaption(name),
    caption: buildPhotoCaption(name)
  };
}

function removeObsidianEmbeds(markdown) {
  return markdown.replace(/!\[\[[^\]]+\]\]/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

async function main() {
  const markdown = await fs.readFile(sourcePath, "utf8");
  await ensureDir(assetDir);

  const daySections = collectDaySections(markdown);
  const days = [];

  for (const day of daySections) {
    const embedPaths = Array.from(day.rawSection.matchAll(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)).map((match) => match[1]);
    const photoPaths = [...new Set([...day.extraPhotos, ...embedPaths])];
    const photos = [];

    for (const relPath of photoPaths) {
      photos.push(await copyPhoto(relPath));
    }

    days.push({
      order: day.order,
      label: day.label,
      kicker: day.kicker,
      title: day.title,
      shortArea: day.shortArea,
      summary: day.summary,
      crowd: day.crowd,
      mood: day.mood,
      color: day.color,
      dashed: Boolean(day.dashed),
      route: day.route,
      transportNote: day.transportNote,
      transit: day.transit,
      highlights: day.highlights,
      food: day.food,
      points: day.points,
      photos,
      markdown: removeObsidianEmbeds(day.rawSection)
    });
  }

  const data = {
    meta: {
      siteTitle: "沈阳 5 日路线册",
      siteSummary: "一张能边走边看的沈阳五一行程页。点 D1-D5 会同步切地图、交通、玩法和当天图文说明。",
      panelTitle: "沈阳五一行程总览",
      panelSummary: "现在这版已经按知识库做成可切换的每日详情页，后续只要你改笔记，我再执行一次同步就能更新网站。",
      sourceNote,
      generatedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      heroPills: ["2 人出行", "2026.05.01 - 05.05", "太原街 / 沈阳站连住 4 晚", "路线顺、少折返、少纯网红"],
      sourcePills: ["知识库驱动", "Day 1-5 同步刷新", "地图与攻略联动", "支持后续再次同步"]
    },
    days
  };

  await fs.writeFile(outputFile, `window.TRIP_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
  console.log(`Synced ${days.length} days to ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
