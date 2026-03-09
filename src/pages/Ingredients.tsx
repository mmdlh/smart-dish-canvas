import { motion } from "framer-motion";
import { Apple, AlertTriangle, Package, Calendar, Search, Filter, ArrowUpDown, TrendingUp, Truck, BarChart3, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const categories = [
  { name: "蔬菜", count: 42, icon: "🥬", color: "kitchen-green" },
  { name: "肉类", count: 18, icon: "🥩", color: "kitchen-red" },
  { name: "海鲜", count: 15, icon: "🦐", color: "kitchen-blue" },
  { name: "调料", count: 56, icon: "🧂", color: "kitchen-orange" },
  { name: "主食", count: 12, icon: "🍚", color: "kitchen-cyan" },
  { name: "乳制品", count: 8, icon: "🧀", color: "kitchen-purple" },
  { name: "干货", count: 22, icon: "🍄", color: "kitchen-teal" },
  { name: "饮品", count: 14, icon: "🥤", color: "kitchen-indigo" },
];

const ingredients = [
  { name: "五花肉", cat: "肉类", stock: 25, unit: "kg", min: 10, expiry: "2026-03-15", supplier: "优品肉业", price: 42, origin: "山东" },
  { name: "大白菜", cat: "蔬菜", stock: 40, unit: "kg", min: 20, expiry: "2026-03-12", supplier: "田园直供", price: 3.5, origin: "河北" },
  { name: "基围虾", cat: "海鲜", stock: 8, unit: "kg", min: 10, expiry: "2026-03-10", supplier: "深海渔港", price: 88, origin: "广东" },
  { name: "生抽", cat: "调料", stock: 30, unit: "瓶", min: 10, expiry: "2026-09-20", supplier: "海天食品", price: 12, origin: "广东" },
  { name: "鸡蛋", cat: "蔬菜", stock: 120, unit: "个", min: 50, expiry: "2026-03-18", supplier: "绿源农场", price: 0.8, origin: "江苏" },
  { name: "面粉", cat: "主食", stock: 50, unit: "kg", min: 20, expiry: "2026-06-01", supplier: "金龙鱼", price: 5, origin: "黑龙江" },
  { name: "橄榄油", cat: "调料", stock: 5, unit: "瓶", min: 8, expiry: "2026-12-15", supplier: "欧丽薇兰", price: 68, origin: "西班牙" },
  { name: "三文鱼", cat: "海鲜", stock: 12, unit: "kg", min: 5, expiry: "2026-03-11", supplier: "北欧海鲜", price: 128, origin: "挪威" },
  { name: "牛腱肉", cat: "肉类", stock: 15, unit: "kg", min: 8, expiry: "2026-03-14", supplier: "优品肉业", price: 65, origin: "内蒙古" },
  { name: "香菇", cat: "干货", stock: 6, unit: "kg", min: 5, expiry: "2026-08-20", supplier: "山珍源", price: 45, origin: "浙江" },
];

const usageByCategory = [
  { cat: "蔬菜", used: 85, total: 120 },
  { cat: "肉类", used: 45, total: 65 },
  { cat: "海鲜", used: 30, total: 42 },
  { cat: "调料", used: 20, total: 80 },
  { cat: "主食", used: 35, total: 60 },
];

const recentOrders = [
  { id: "PO-2026031", supplier: "优品肉业", items: 5, total: "¥3,680", status: "已到货", date: "03-08" },
  { id: "PO-2026030", supplier: "田园直供", items: 8, total: "¥1,240", status: "运输中", date: "03-08" },
  { id: "PO-2026029", supplier: "深海渔港", items: 3, total: "¥5,860", status: "待发货", date: "03-07" },
  { id: "PO-2026028", supplier: "海天食品", items: 12, total: "¥960", status: "已到货", date: "03-07" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const Ingredients = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Category cards */}
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {categories.map((c) => (
        <motion.div key={c.name} variants={item} className="glass-card p-3 text-center hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
          <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{c.icon}</span>
          <p className="text-xs font-medium">{c.name}</p>
          <p className={`text-[11px] text-kitchen-${c.color} font-display`}>{c.count} 种</p>
        </motion.div>
      ))}
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[
        { icon: Package, label: "食材总数", value: "187 种", cls: "glass-card-cyan" },
        { icon: AlertTriangle, label: "库存预警", value: "3 种", cls: "glass-card-orange" },
        { icon: Calendar, label: "临期食材", value: "5 种", cls: "glass-card-red" },
        { icon: Apple, label: "今日入库", value: "12 批次", cls: "glass-card-green" },
        { icon: Truck, label: "在途订单", value: "2 单", cls: "glass-card-blue" },
      ].map((s) => (
        <motion.div key={s.label} variants={item} className={`${s.cls} p-4 flex items-center gap-3`}>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="font-semibold text-sm">{s.value}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Search & filter bar */}
    <motion.div variants={item} className="glass-card p-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="搜索食材名称、供应商..." className="pl-9" />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition"><Filter className="w-3.5 h-3.5" />筛选</button>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition"><ArrowUpDown className="w-3.5 h-3.5" />排序</button>
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition"><ShoppingCart className="w-3.5 h-3.5" />新建采购</button>
    </motion.div>

    {/* Inventory table */}
    <motion.div variants={item} className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/50">
              {["食材","分类","库存","产地","保质期","供应商","单价","状态"].map(h => (
                <th key={h} className={`${h === "单价" ? "text-right" : h === "状态" ? "text-center" : "text-left"} p-3 text-xs font-medium text-muted-foreground`}>{h}</th>
              ))}
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
                  <td className="p-3 text-xs text-muted-foreground">{ing.origin}</td>
                  <td className="p-3 text-sm">{ing.expiry}</td>
                  <td className="p-3 text-sm text-muted-foreground">{ing.supplier}</td>
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

    {/* Bottom: usage chart + recent orders */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><BarChart3 className="w-4 h-4 text-primary" />分类消耗统计 (本周)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={usageByCategory} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <YAxis type="category" dataKey="cat" tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" width={40} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Bar dataKey="used" fill="hsl(185,75%,40%)" radius={[0,4,4,0]} name="已消耗 kg" />
            <Bar dataKey="total" fill="hsl(200,25%,85%)" radius={[0,4,4,0]} name="总库存 kg" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Truck className="w-4 h-4 text-primary" />近期采购订单</h3>
        <div className="space-y-3">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{o.id}</span>
                  <span className={`mini-badge ${
                    o.status === "已到货" ? "bg-kitchen-green-light text-kitchen-green" :
                    o.status === "运输中" ? "bg-kitchen-blue-light text-kitchen-blue" :
                    "bg-kitchen-orange-light text-kitchen-orange"
                  }`}>{o.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{o.supplier} · {o.items} 种食材</p>
              </div>
              <div className="text-right">
                <p className="font-display text-sm font-semibold">{o.total}</p>
                <p className="text-[11px] text-muted-foreground">{o.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Ingredients;
