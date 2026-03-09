import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Target, Clock, Star, Award, Percent } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, AreaChart, Area } from "recharts";

const monthlyRevenue = [
  { month: "1月", revenue: 182000, cost: 98000, profit: 84000 },
  { month: "2月", revenue: 165000, cost: 92000, profit: 73000 },
  { month: "3月", revenue: 198000, cost: 105000, profit: 93000 },
  { month: "4月", revenue: 210000, cost: 108000, profit: 102000 },
  { month: "5月", revenue: 225000, cost: 112000, profit: 113000 },
  { month: "6月", revenue: 248000, cost: 118000, profit: 130000 },
];

const dailyOrders = Array.from({ length: 14 }, (_, i) => ({
  date: `3/${i + 1}`,
  orders: Math.round(120 + Math.sin(i / 2) * 40 + Math.random() * 20),
  customers: Math.round(90 + Math.cos(i / 3) * 30 + Math.random() * 15),
}));

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
  { name: "宫保鸡丁", sales: 328, revenue: 9840, trend: 12, rating: 4.7 },
  { name: "糖醋排骨", sales: 285, revenue: 11400, trend: 8, rating: 4.8 },
  { name: "清蒸鲈鱼", sales: 256, revenue: 15360, trend: -3, rating: 4.8 },
  { name: "麻婆豆腐", sales: 242, revenue: 4840, trend: 15, rating: 4.6 },
  { name: "东坡肉", sales: 198, revenue: 13860, trend: 5, rating: 4.9 },
];

const peakHours = [
  { hour: "11:00", orders: 25 }, { hour: "11:30", orders: 48 }, { hour: "12:00", orders: 72 },
  { hour: "12:30", orders: 65 }, { hour: "13:00", orders: 38 }, { hour: "17:30", orders: 32 },
  { hour: "18:00", orders: 58 }, { hour: "18:30", orders: 70 }, { hour: "19:00", orders: 55 },
  { hour: "19:30", orders: 35 },
];

const customerFeedback = [
  { label: "非常满意", pct: 62, color: "kitchen-green" },
  { label: "满意", pct: 25, color: "kitchen-cyan" },
  { label: "一般", pct: 8, color: "kitchen-orange" },
  { label: "不满意", pct: 5, color: "kitchen-red" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Analytics = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* KPIs */}
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
      {[
        { icon: DollarSign, label: "本月营收", value: "¥248K", change: 10.2, color: "cyan" },
        { icon: ShoppingCart, label: "本月订单", value: "3,862", change: 7.5, color: "blue" },
        { icon: Users, label: "日均客流", value: "186", change: -2.1, color: "green" },
        { icon: Target, label: "毛利率", value: "52.4%", change: 1.8, color: "purple" },
        { icon: Clock, label: "平均出餐", value: "12min", change: -5.3, color: "orange" },
        { icon: Star, label: "客户评分", value: "4.7", change: 0.2, color: "teal" },
        { icon: Award, label: "翻台率", value: "3.2", change: 4.1, color: "indigo" },
        { icon: Percent, label: "复购率", value: "68%", change: 3.5, color: "cyan" },
      ].map((k) => (
        <motion.div key={k.label} variants={item} className={`glass-card-${k.color} p-3`}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <k.icon className={`w-3.5 h-3.5 text-kitchen-${k.color}`} />
            <span className="text-[11px] text-muted-foreground">{k.label}</span>
          </div>
          <p className="stat-value text-lg mb-0.5">{k.value}</p>
          <div className={`flex items-center gap-0.5 text-[11px] ${k.change > 0 ? "text-kitchen-green" : "text-kitchen-red"}`}>
            {k.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(k.change)}%
          </div>
        </motion.div>
      ))}
    </div>

    {/* Revenue + orders trend */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><TrendingUp className="w-4 h-4 text-primary" />营收与利润趋势</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" tickFormatter={(v) => `${v / 10000}万`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} formatter={(v: number) => `¥${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(185,75%,40%)" strokeWidth={2.5} dot={{ fill: "hsl(185,75%,40%)", r: 4 }} name="营收" />
            <Line type="monotone" dataKey="profit" stroke="hsl(155,65%,42%)" strokeWidth={2} dot={{ fill: "hsl(155,65%,42%)", r: 3 }} name="利润" />
            <Line type="monotone" dataKey="cost" stroke="hsl(28,90%,55%)" strokeWidth={1.5} dot={false} strokeDasharray="5 5" name="成本" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><ShoppingCart className="w-4 h-4 text-primary" />近两周订单/客流</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dailyOrders}>
            <defs>
              <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185,75%,40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(185,75%,40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Area type="monotone" dataKey="orders" stroke="hsl(185,75%,40%)" fill="url(#ordGrad)" strokeWidth={2} name="订单数" />
            <Line type="monotone" dataKey="customers" stroke="hsl(260,60%,55%)" strokeWidth={1.5} dot={false} name="客流" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Category pie + radar + peak hours */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title">菜系销售占比</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={categoryPie} innerRadius={32} outerRadius={55} dataKey="value" stroke="none">
                {categoryPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 flex-1">
            {categoryPie.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="flex-1">{c.name}</span><span className="text-muted-foreground font-display">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title">综合评估雷达</h3>
        <ResponsiveContainer width="100%" height={180}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(200,25%,90%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis tick={false} domain={[0, 100]} />
            <Radar dataKey="A" stroke="hsl(185,75%,40%)" fill="hsl(185,75%,40%)" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Clock className="w-4 h-4 text-primary" />高峰时段分布</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={peakHours}>
            <XAxis dataKey="hour" tick={{ fontSize: 9 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Bar dataKey="orders" fill="hsl(185,75%,40%)" radius={[3,3,0,0]} name="订单数" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Top dishes + customer feedback */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="section-title"><BarChart3 className="w-4 h-4 text-primary" />热销菜品 TOP 5</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topDishes.map((d, i) => (
            <div key={d.name} className="glass-card p-4 text-center hover:-translate-y-0.5 transition-all duration-300">
              <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center text-xs font-bold mb-2 ${i === 0 ? "bg-kitchen-orange text-primary-foreground" : i === 1 ? "bg-secondary text-secondary-foreground" : "bg-secondary/60 text-muted-foreground"}`}>{i + 1}</span>
              <p className="font-semibold text-sm mb-1">{d.name}</p>
              <p className="font-display text-lg text-primary font-bold">{d.sales}</p>
              <p className="text-xs text-muted-foreground">¥{d.revenue.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-xs"><Star className="w-3 h-3 text-kitchen-orange fill-kitchen-orange" />{d.rating}</span>
                <span className={`text-xs flex items-center gap-0.5 ${d.trend > 0 ? "text-kitchen-green" : "text-kitchen-red"}`}>
                  {d.trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{Math.abs(d.trend)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Users className="w-4 h-4 text-primary" />客户满意度</h3>
        <div className="space-y-3">
          {customerFeedback.map((f) => (
            <div key={f.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{f.label}</span>
                <span className={`font-display font-semibold text-${f.color}`}>{f.pct}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div className={`h-full rounded-full bg-${f.color}`} initial={{ width: 0 }} animate={{ width: `${f.pct}%` }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t mt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">综合评分</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => <Star key={n} className={`w-4 h-4 ${n <= 4 ? "text-kitchen-orange fill-kitchen-orange" : "text-kitchen-orange"}`} />)}
                <span className="font-display font-bold ml-1">4.7</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Analytics;
