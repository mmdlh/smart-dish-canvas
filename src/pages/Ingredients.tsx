import { motion } from "framer-motion";
import { Apple, AlertTriangle, Package, Calendar, Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const categories = [
  { name: "蔬菜", count: 42, icon: "🥬", color: "kitchen-green" },
  { name: "肉类", count: 18, icon: "🥩", color: "kitchen-red" },
  { name: "海鲜", count: 15, icon: "🦐", color: "kitchen-blue" },
  { name: "调料", count: 56, icon: "🧂", color: "kitchen-orange" },
  { name: "主食", count: 12, icon: "🍚", color: "kitchen-cyan" },
  { name: "乳制品", count: 8, icon: "🧀", color: "kitchen-purple" },
];

const ingredients = [
  { name: "五花肉", cat: "肉类", stock: 25, unit: "kg", min: 10, expiry: "2026-03-15", supplier: "优品肉业", price: 42 },
  { name: "大白菜", cat: "蔬菜", stock: 40, unit: "kg", min: 20, expiry: "2026-03-12", supplier: "田园直供", price: 3.5 },
  { name: "基围虾", cat: "海鲜", stock: 8, unit: "kg", min: 10, expiry: "2026-03-10", supplier: "深海渔港", price: 88 },
  { name: "生抽", cat: "调料", stock: 30, unit: "瓶", min: 10, expiry: "2026-09-20", supplier: "海天食品", price: 12 },
  { name: "鸡蛋", cat: "蔬菜", stock: 120, unit: "个", min: 50, expiry: "2026-03-18", supplier: "绿源农场", price: 0.8 },
  { name: "面粉", cat: "主食", stock: 50, unit: "kg", min: 20, expiry: "2026-06-01", supplier: "金龙鱼", price: 5 },
  { name: "橄榄油", cat: "调料", stock: 5, unit: "瓶", min: 8, expiry: "2026-12-15", supplier: "欧丽薇兰", price: 68 },
  { name: "三文鱼", cat: "海鲜", stock: 12, unit: "kg", min: 5, expiry: "2026-03-11", supplier: "北欧海鲜", price: 128 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const Ingredients = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Category cards */}
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((c) => (
        <motion.div key={c.name} variants={item} className="glass-card p-4 text-center hover:shadow-md transition-shadow cursor-pointer group">
          <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{c.icon}</span>
          <p className="text-sm font-medium">{c.name}</p>
          <p className={`text-xs text-kitchen-${c.color} font-display`}>{c.count} 种</p>
        </motion.div>
      ))}
    </div>

    {/* Search & filter bar */}
    <motion.div variants={item} className="glass-card p-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="搜索食材名称..." className="pl-9" />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition">
        <Filter className="w-3.5 h-3.5" />筛选
      </button>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition">
        <ArrowUpDown className="w-3.5 h-3.5" />排序
      </button>
    </motion.div>

    {/* Inventory table */}
    <motion.div variants={item} className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/50">
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">食材</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">分类</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground">库存</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden md:table-cell">保质期</th>
              <th className="text-left p-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">供应商</th>
              <th className="text-right p-3 text-xs font-medium text-muted-foreground">单价</th>
              <th className="text-center p-3 text-xs font-medium text-muted-foreground">状态</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => {
              const low = ing.stock <= ing.min;
              const nearExpiry = new Date(ing.expiry) < new Date("2026-03-13");
              return (
                <tr key={ing.name} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-sm font-medium">{ing.name}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{ing.cat}</Badge></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Progress value={(ing.stock / (ing.min * 3)) * 100} className="h-1.5 w-16" />
                      <span className="text-sm">{ing.stock} {ing.unit}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm hidden md:table-cell">{ing.expiry}</td>
                  <td className="p-3 text-sm text-muted-foreground hidden lg:table-cell">{ing.supplier}</td>
                  <td className="p-3 text-sm text-right font-display">¥{ing.price}</td>
                  <td className="p-3 text-center">
                    {low && <Badge variant="destructive" className="text-xs gap-1"><AlertTriangle className="w-3 h-3" />库存低</Badge>}
                    {nearExpiry && !low && <Badge className="text-xs bg-kitchen-orange text-primary-foreground gap-1"><Calendar className="w-3 h-3" />临期</Badge>}
                    {!low && !nearExpiry && <Badge variant="secondary" className="text-xs">正常</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>

    {/* Quick stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Package, label: "食材总数", value: "151 种" },
        { icon: AlertTriangle, label: "库存预警", value: "3 种" },
        { icon: Calendar, label: "临期食材", value: "5 种" },
        { icon: Apple, label: "今日入库", value: "12 批次" },
      ].map((s) => (
        <motion.div key={s.label} variants={item} className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-semibold text-sm">{s.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Ingredients;
