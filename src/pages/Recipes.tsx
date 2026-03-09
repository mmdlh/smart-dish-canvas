import { motion } from "framer-motion";
import { ChefHat, Clock, Users, Flame, Star, Heart, Eye, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featured = {
  name: "松鼠鳜鱼",
  desc: "经典苏帮菜，外酥里嫩，酸甜可口。精选鲜活鳜鱼，刀工精细，炸至金黄后浇上特制糖醋汁。",
  time: "45分钟", serves: "4人份", difficulty: "高级", calories: "380 kcal",
  rating: 4.9, views: 2840, likes: 586,
};

const recipes = [
  { name: "宫保鸡丁", cat: "川菜", time: "25min", diff: "中级", rating: 4.7, img: "🍗" },
  { name: "清蒸鲈鱼", cat: "粤菜", time: "20min", diff: "简单", rating: 4.8, img: "🐟" },
  { name: "麻婆豆腐", cat: "川菜", time: "15min", diff: "简单", rating: 4.6, img: "🫘" },
  { name: "东坡肉", cat: "浙菜", time: "90min", diff: "高级", rating: 4.9, img: "🥩" },
  { name: "蒜蓉粉丝蒸扇贝", cat: "粤菜", time: "15min", diff: "简单", rating: 4.5, img: "🦪" },
  { name: "水煮牛肉", cat: "川菜", time: "30min", diff: "中级", rating: 4.7, img: "🥘" },
  { name: "糖醋排骨", cat: "鲁菜", time: "40min", diff: "中级", rating: 4.8, img: "🍖" },
  { name: "蛋炒饭", cat: "家常", time: "10min", diff: "简单", rating: 4.3, img: "🍳" },
];

const weekMenu = [
  { day: "周一", lunch: "红烧牛腩 / 蒜蓉西兰花 / 紫菜蛋花汤", dinner: "糖醋里脊 / 清炒时蔬 / 酸辣汤" },
  { day: "周二", lunch: "宫保鸡丁 / 干煸四季豆 / 番茄蛋汤", dinner: "清蒸鲈鱼 / 蒜蓉菠菜 / 冬瓜排骨汤" },
  { day: "周三", lunch: "回锅肉 / 醋溜白菜 / 豆腐汤", dinner: "水煮鱼 / 凉拌黄瓜 / 南瓜粥" },
];

const diffColor: Record<string, string> = { "简单": "bg-kitchen-green-light text-kitchen-green", "中级": "bg-kitchen-orange-light text-kitchen-orange", "高级": "bg-kitchen-red-light text-kitchen-red" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Recipes = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Featured recipe - hero card */}
    <motion.div variants={item} className="glass-card-cyan p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-kitchen-cyan-light to-transparent rounded-bl-full opacity-60" />
      <div className="relative">
        <Badge className="mb-3 bg-primary text-primary-foreground">今日推荐</Badge>
        <h2 className="text-2xl font-bold mb-2">{featured.name}</h2>
        <p className="text-muted-foreground text-sm max-w-xl mb-4">{featured.desc}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-kitchen-cyan" />{featured.time}</span>
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-kitchen-blue" />{featured.serves}</span>
          <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-kitchen-orange" />{featured.difficulty}</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-kitchen-orange fill-kitchen-orange" />{featured.rating}</span>
          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-muted-foreground" />{featured.views}</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-kitchen-red" />{featured.likes}</span>
        </div>
      </div>
    </motion.div>

    {/* Recipe grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.map((r) => (
        <motion.div key={r.name} variants={item} className="glass-card p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform text-center">{r.img}</div>
          <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">{r.cat}</Badge>
            <span className={`text-xs px-1.5 py-0.5 rounded ${diffColor[r.diff]}`}>{r.diff}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-kitchen-orange fill-kitchen-orange" />{r.rating}</span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Weekly menu */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" />本周菜单</h3>
      <div className="space-y-3">
        {weekMenu.map((w) => (
          <div key={w.day} className="flex gap-4 items-start p-3 rounded-lg bg-secondary/40">
            <span className="font-display text-sm font-bold text-primary w-10 shrink-0">{w.day}</span>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><span className="text-xs text-muted-foreground">午餐：</span>{w.lunch}</div>
              <div><span className="text-xs text-muted-foreground">晚餐：</span>{w.dinner}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Recipes;
