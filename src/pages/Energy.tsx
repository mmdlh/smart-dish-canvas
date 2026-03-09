import { motion } from "framer-motion";
import { Zap, Flame, Droplets, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart3, Calendar, Target, Lightbulb, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const hourlyData = [
  { time: "06:00", electric: 45, gas: 30, water: 20 },
  { time: "08:00", electric: 85, gas: 60, water: 35 },
  { time: "10:00", electric: 120, gas: 95, water: 55 },
  { time: "12:00", electric: 160, gas: 130, water: 75 },
  { time: "14:00", electric: 130, gas: 90, water: 60 },
  { time: "16:00", electric: 100, gas: 70, water: 40 },
  { time: "18:00", electric: 155, gas: 120, water: 70 },
  { time: "20:00", electric: 140, gas: 105, water: 55 },
  { time: "22:00", electric: 60, gas: 35, water: 25 },
];

const weeklyData = [
  { day: "周一", cost: 2850 }, { day: "周二", cost: 3100 }, { day: "周三", cost: 2960 },
  { day: "周四", cost: 3250 }, { day: "周五", cost: 3800 }, { day: "周六", cost: 4200 }, { day: "周日", cost: 3650 },
];

const energyBreakdown = [
  { name: "照明", value: 15 }, { name: "烹饪设备", value: 42 },
  { name: "制冷", value: 20 }, { name: "排风", value: 12 }, { name: "其他", value: 11 },
];
const PIE_COLORS = ["hsl(185,75%,40%)", "hsl(28,90%,55%)", "hsl(215,85%,55%)", "hsl(155,65%,42%)", "hsl(260,60%,55%)"];

const monthlyComparison = [
  { month: "10月", current: 28500, target: 30000 },
  { month: "11月", current: 27800, target: 29000 },
  { month: "12月", current: 31200, target: 29500 },
  { month: "1月", current: 26500, target: 28000 },
  { month: "2月", current: 25800, target: 27000 },
  { month: "3月", current: 24200, target: 26000 },
];

const savingTips = [
  { tip: "建议在非高峰时段运行洗碗机，可节省约15%用电", impact: "高", area: "用电" },
  { tip: "冷藏柜门封条老化，更换后预计节能8%", impact: "中", area: "制冷" },
  { tip: "烘焙区排风系统可优化为变频模式", impact: "高", area: "排风" },
  { tip: "夜间照明可切换为感应模式", impact: "低", area: "照明" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Energy = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* KPI Row */}
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {[
        { icon: Zap, label: "今日用电", value: "862", unit: "kWh", change: -5.2, color: "cyan" },
        { icon: Flame, label: "今日用气", value: "345", unit: "m³", change: 2.1, color: "orange" },
        { icon: Droplets, label: "今日用水", value: "18.6", unit: "吨", change: -8.3, color: "blue" },
        { icon: TrendingDown, label: "本月节省", value: "¥3,280", unit: "", change: -12.5, color: "green" },
        { icon: Target, label: "能效评分", value: "87", unit: "分", change: 3.2, color: "purple" },
        { icon: Calendar, label: "碳排放", value: "2.4", unit: "吨CO₂", change: -6.8, color: "teal" },
      ].map((k) => (
        <motion.div key={k.label} variants={item} className={`glass-card-${k.color} p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <k.icon className={`w-4 h-4 text-kitchen-${k.color}`} />
            <span className="text-xs text-muted-foreground">{k.label}</span>
          </div>
          <div className="flex items-end gap-1.5">
            <span className="stat-value text-xl">{k.value}</span>
            <span className="text-[11px] text-muted-foreground mb-0.5">{k.unit}</span>
          </div>
          <div className={`flex items-center gap-1 mt-1.5 text-[11px] ${k.change < 0 ? "text-kitchen-green" : "text-kitchen-orange"}`}>
            {k.change < 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
            {Math.abs(k.change)}% 较昨日
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="section-title"><BarChart3 className="w-4 h-4 text-primary" />今日能耗趋势</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={hourlyData}>
            <defs>
              <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185,75%,40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(185,75%,40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(28,90%,55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(28,90%,55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215,85%,55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(215,85%,55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            <Area type="monotone" dataKey="electric" stroke="hsl(185,75%,40%)" fill="url(#colorElec)" strokeWidth={2} name="用电 kWh" />
            <Area type="monotone" dataKey="gas" stroke="hsl(28,90%,55%)" fill="url(#colorGas)" strokeWidth={2} name="用气 m³" />
            <Area type="monotone" dataKey="water" stroke="hsl(215,85%,55%)" fill="url(#colorWater)" strokeWidth={2} name="用水 吨" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title">本周费用统计</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(210,10%,50%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Bar dataKey="cost" fill="hsl(185,75%,40%)" radius={[4, 4, 0, 0]} name="费用 ¥" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Energy breakdown + monthly comparison */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Zap className="w-4 h-4 text-primary" />用电结构分析</h3>
        <div className="flex items-center gap-6">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={energyBreakdown} innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                {energyBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {energyBreakdown.map((e, i) => (
              <div key={e.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-sm flex-1">{e.name}</span>
                <span className="font-display text-sm font-semibold">{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Target className="w-4 h-4 text-primary" />月度能耗对比</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthlyComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Bar dataKey="current" fill="hsl(185,75%,40%)" radius={[3,3,0,0]} name="实际 ¥" />
            <Bar dataKey="target" fill="hsl(200,25%,85%)" radius={[3,3,0,0]} name="目标 ¥" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Equipment ranking + saving tips */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title">设备能耗排行</h3>
        <div className="space-y-3">
          {[
            { name: "智能烤箱 A1", val: 186, pct: 100 },
            { name: "蒸汽炉 B2", val: 142, pct: 76 },
            { name: "油炸机 C1", val: 128, pct: 69 },
            { name: "消毒柜 F1", val: 95, pct: 51 },
            { name: "冷藏柜 D1", val: 78, pct: 42 },
            { name: "和面机 G1", val: 52, pct: 28 },
          ].map((e, i) => (
            <div key={e.name} className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{i + 1}</span>
              <span className="text-sm w-28 shrink-0">{e.name}</span>
              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
              </div>
              <span className="text-sm font-display w-20 text-right">{e.val} kWh</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Lightbulb className="w-4 h-4 text-kitchen-orange" />节能建议</h3>
        <div className="space-y-3">
          {savingTips.map((t, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/40 border border-border/30 hover:bg-secondary/60 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className={`mini-badge ${t.impact === "高" ? "bg-kitchen-green-light text-kitchen-green" : t.impact === "中" ? "bg-kitchen-cyan-light text-kitchen-cyan" : "bg-secondary text-muted-foreground"}`}>
                  {t.impact}影响
                </span>
                <span className="mini-badge bg-kitchen-blue-light text-kitchen-blue">{t.area}</span>
              </div>
              <p className="text-sm">{t.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Energy;
