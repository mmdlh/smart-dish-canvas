import { motion } from "framer-motion";
import { ChefHat, Clock, Users, Flame, Star, Heart, Eye, BookOpen, TrendingUp, Award, Utensils, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featured = {
  name: "松鼠鳜鱼",
  desc: "经典苏帮菜，外酥里嫩，酸甜可口。精选鲜活鳜鱼，刀工精细，炸至金黄后浇上特制糖醋汁。配以松仁、豌豆点缀，色香味俱全。",
  time: "45分钟", serves: "4人份", difficulty: "高级", calories: "380 kcal",
  rating: 4.9, views: 2840, likes: 586,
  steps: ["鳜鱼改花刀", "裹淀粉炸制", "调制糖醋汁", "浇汁装盘"],
};

const recipes = [
  { name: "宫保鸡丁", cat: "川菜", time: "25min", diff: "中级", rating: 4.7, img: "🍗", likes: 328 },
  { name: "清蒸鲈鱼", cat: "粤菜", time: "20min", diff: "简单", rating: 4.8, img: "🐟", likes: 256 },
  { name: "麻婆豆腐", cat: "川菜", time: "15min", diff: "简单", rating: 4.6, img: "🫘", likes: 198 },
  { name: "东坡肉", cat: "浙菜", time: "90min", diff: "高级", rating: 4.9, img: "🥩", likes: 445 },
  { name: "蒜蓉粉丝蒸扇贝", cat: "粤菜", time: "15min", diff: "简单", rating: 4.5, img: "🦪", likes: 165 },
  { name: "水煮牛肉", cat: "川菜", time: "30min", diff: "中级", rating: 4.7, img: "🥘", likes: 312 },
  { name: "糖醋排骨", cat: "鲁菜", time: "40min", diff: "中级", rating: 4.8, img: "🍖", likes: 389 },
  { name: "蛋炒饭", cat: "家常", time: "10min", diff: "简单", rating: 4.3, img: "🍳", likes: 502 },
  { name: "红烧狮子头", cat: "淮扬菜", time: "50min", diff: "中级", rating: 4.6, img: "🧆", likes: 215 },
  { name: "干锅花菜", cat: "湘菜", time: "20min", diff: "简单", rating: 4.4, img: "🥦", likes: 178 },
  { name: "回锅肉", cat: "川菜", time: "25min", diff: "中级", rating: 4.7, img: "🥓", likes: 345 },
  { name: "白切鸡", cat: "粤菜", time: "35min", diff: "中级", rating: 4.8, img: "🍗", likes: 298 },
];

const weekMenu = [
  { day: "周一", lunch: "红烧牛腩 / 蒜蓉西兰花 / 紫菜蛋花汤", dinner: "糖醋里脊 / 清炒时蔬 / 酸辣汤" },
  { day: "周二", lunch: "宫保鸡丁 / 干煸四季豆 / 番茄蛋汤", dinner: "清蒸鲈鱼 / 蒜蓉菠菜 / 冬瓜排骨汤" },
  { day: "周三", lunch: "回锅肉 / 醋溜白菜 / 豆腐汤", dinner: "水煮鱼 / 凉拌黄瓜 / 南瓜粥" },
  { day: "周四", lunch: "红烧排骨 / 青椒土豆丝 / 西红柿汤", dinner: "剁椒鱼头 / 蒸南瓜 / 皮蛋瘦肉粥" },
  { day: "周五", lunch: "鱼香肉丝 / 蚝油生菜 / 玉米排骨汤", dinner: "烤羊排 / 凉拌木耳 / 银耳莲子汤" },
];

const chefBoard = [
  { name: "王大厨", specialty: "川菜", dishes: 156, rating: 4.9, badge: "金牌" },
  { name: "李师傅", specialty: "粤菜", dishes: 132, rating: 4.8, badge: "银牌" },
  { name: "张主厨", specialty: "鲁菜", dishes: 118, rating: 4.7, badge: "银牌" },
  { name: "陈师傅", specialty: "淮扬菜", dishes: 95, rating: 4.6, badge: "铜牌" },
];

const diffColor: Record<string, string> = { "简单": "bg-kitchen-green-light text-kitchen-green", "中级": "bg-kitchen-orange-light text-kitchen-orange", "高级": "bg-kitchen-red-light text-kitchen-red" };
const badgeColor: Record<string, string> = { "金牌": "bg-kitchen-orange text-primary-foreground", "银牌": "bg-secondary text-secondary-foreground", "铜牌": "bg-kitchen-orange-light text-kitchen-orange" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Recipes = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Featured recipe */}
    <motion.div variants={item} className="glass-card-cyan p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-kitchen-cyan-light to-transparent rounded-bl-full opacity-60" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-kitchen-blue-light to-transparent rounded-tr-full opacity-40" />
      <div className="relative">
        <Badge className="mb-3 bg-primary text-primary-foreground">✨ 今日推荐</Badge>
        <h2 className="text-2xl font-bold mb-2">{featured.name}</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mb-4">{featured.desc}</p>
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-kitchen-cyan" />{featured.time}</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-kitchen-blue" />{featured.serves}</span>
          <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-kitchen-orange" />{featured.difficulty}</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-kitchen-orange fill-kitchen-orange" />{featured.rating}</span>
          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-muted-foreground" />{featured.views}</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-kitchen-red" />{featured.likes}</span>
        </div>
        <div className="flex gap-2">
          {featured.steps.map((s, i) => (
            <span key={i} className="mini-badge bg-primary/10 text-primary">
              <span className="font-display text-[10px] mr-1">{i + 1}</span>{s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Quick stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: BookOpen, label: "菜谱总数", value: "286", color: "cyan" },
        { icon: TrendingUp, label: "本周新增", value: "12", color: "green" },
        { icon: ThumbsUp, label: "好评菜品", value: "245", color: "blue" },
        { icon: Award, label: "招牌菜", value: "18", color: "orange" },
      ].map((s) => (
        <motion.div key={s.label} variants={item} className={`glass-card-${s.color} p-4 flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-lg bg-kitchen-${s.color}-light flex items-center justify-center`}>
            <s.icon className={`w-5 h-5 text-kitchen-${s.color}`} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="stat-value text-xl">{s.value}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Recipe grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {recipes.map((r) => (
        <motion.div key={r.name} variants={item} className="glass-card p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform text-center">{r.img}</div>
          <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <Badge variant="secondary" className="text-[11px]">{r.cat}</Badge>
            <span className={`text-[11px] px-1.5 py-0.5 rounded ${diffColor[r.diff]}`}>{r.diff}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-kitchen-orange fill-kitchen-orange" />{r.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Heart className="w-3 h-3" />{r.likes}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom: weekly menu + chef board */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="section-title"><BookOpen className="w-4 h-4 text-primary" />本周菜单</h3>
        <div className="space-y-2.5">
          {weekMenu.map((w) => (
            <div key={w.day} className="flex gap-4 items-start p-3 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors">
              <span className="font-display text-sm font-bold text-primary w-10 shrink-0">{w.day}</span>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-1.5 text-sm">
                <div><span className="text-[11px] text-muted-foreground mr-1">🌞 午餐</span>{w.lunch}</div>
                <div><span className="text-[11px] text-muted-foreground mr-1">🌙 晚餐</span>{w.dinner}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Utensils className="w-4 h-4 text-primary" />厨师排行</h3>
        <div className="space-y-3">
          {chefBoard.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-kitchen-orange text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className={`mini-badge ${badgeColor[c.badge]}`}>{c.badge}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{c.specialty} · {c.dishes} 道菜品</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-3.5 h-3.5 text-kitchen-orange fill-kitchen-orange" />
                <span className="font-display font-semibold">{c.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Recipes;
