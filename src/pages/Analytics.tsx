import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const monthlyRevenue = [
  { month: "1月", revenue: 182000, cost: 98000 },
  { month: "2月", revenue: 165000, cost: 92000 },
  { month: "3月", revenue: 198000, cost: 105000 },
  { month: "4月", revenue: 210000, cost: 108000 },
  { month: "5月", revenue: 225000, cost: 112000 },
  { month: "6月", revenue: 248000, cost: 118000 },
];

const categoryPie = [
  { name: "川菜", value: 35 }, { name: "粤菜", value: 25 },
  { name: "鲁菜", value: 15 }, { name: "浙菜", value: 12 }, { name: "其他", value: 13 },
];
const COLORS = ["hsl(185,75%,40%)", "hsl(215,85%,55%)", "hsl(155,65%,42%)", "hsl(28,90%,55%)", "hsl(260,60%,55%)"];

const radarData = [
  { subject: "菜品质量", A: 92 }, { subject: "出餐速度", A: 85 },
  { subject: "食材新鲜度", A: 95 }, { subject: "客户满意度", A: 88 },
  { subject: "成本控制", A: 78 }, { subject: "卫生安全", A: 96 },
];

const topDishes = [
  { name: "宫保鸡丁", sales: 328, revenue: 9840, trend: 12 },
  { name: "糖醋排骨", sales: 285, revenue: 11400, trend: 8 },
  { name: "清蒸鲈鱼", sales: 256, revenue: 15360, trend: -3 },
  { name: "麻婆豆腐", sales: 242, revenue: 4840, trend: 15 },
  { name: "东坡肉", sales: 198, revenue: 13860, trend: 5 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Analytics = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* KPIs */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: DollarSign, label: "本月营收", value: "¥248,000", change: 10.2, color: "cyan" },
        { icon: ShoppingCart, label: "本月订单", value: "3,862", change: 7.5, color: "blue" },
        { icon: Users, label: "日均客流", value: "186", change: -2.1, color: "green" },
        { icon: Target, label: "毛利率", value: "52.4%", change: 1.8, color: "purple" },
      ].map((k) => (
        <motion.div key={k.label} variants={item} className={`glass-card-${k.color} p-5`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{k.label}</span>
            <k.icon className={`w-4 h-4 text-kitchen-${k.color}`} />
          </div>
          <p className="stat-value text-2xl mb-1">{k.value}</p>
          <div className={`flex items-center gap-1 text-xs ${k.change > 0 ? "text-kitchen-green" : "text-kitchen-red"}`}>
            {k.change > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(k.change)}% 较上月
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Revenue trend */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />营收趋势</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" tickFormatter={(v) => `${v / 10000}万`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} formatter={(v: number) => `¥${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(185,75%,40%)" strokeWidth={2.5} dot={{ fill: "hsl(185,75%,40%)", r: 4 }} name="营收" />
            <Line type="monotone" dataKey="cost" stroke="hsl(28,90%,55%)" strokeWidth={2} dot={{ fill: "hsl(28,90%,55%)", r: 3 }} strokeDasharray="5 5" name="成本" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category pie + radar */}
      <div className="grid grid-rows-2 gap-4">
        <motion.div variants={item} className="glass-card p-5 flex items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-2">菜系占比</h3>
            <div className="space-y-1">
              {categoryPie.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span>{c.name}</span><span className="text-muted-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={categoryPie} innerRadius={30} outerRadius={50} dataKey="value" stroke="none">
                {categoryPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-2">综合评估</h3>
          <ResponsiveContainer width="100%" height={120}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(200,25%,90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
              <PolarRadiusAxis tick={false} domain={[0, 100]} />
              <Radar dataKey="A" stroke="hsl(185,75%,40%)" fill="hsl(185,75%,40%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>

    {/* Top dishes */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" />热销菜品 TOP 5</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {topDishes.map((d, i) => (
          <div key={d.name} className="glass-card p-4 text-center">
            <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs font-bold mb-2 ${i === 0 ? "bg-kitchen-orange text-primary-foreground" : "bg-secondary"}`}>{i + 1}</span>
            <p className="font-semibold text-sm mb-1">{d.name}</p>
            <p className="font-display text-lg text-primary font-bold">{d.sales}</p>
            <p className="text-xs text-muted-foreground">销量 · ¥{d.revenue.toLocaleString()}</p>
            <div className={`text-xs mt-1 flex items-center justify-center gap-0.5 ${d.trend > 0 ? "text-kitchen-green" : "text-kitchen-red"}`}>
              {d.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{Math.abs(d.trend)}%
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Analytics;
