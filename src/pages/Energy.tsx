import { motion } from "framer-motion";
import { Zap, Flame, Droplets, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const Energy = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* KPI Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: Zap, label: "今日用电", value: "862", unit: "kWh", change: -5.2, color: "cyan" },
        { icon: Flame, label: "今日用气", value: "345", unit: "m³", change: 2.1, color: "orange" },
        { icon: Droplets, label: "今日用水", value: "18.6", unit: "吨", change: -8.3, color: "blue" },
        { icon: TrendingDown, label: "本月节省", value: "¥3,280", unit: "", change: -12.5, color: "green" },
      ].map((k) => (
        <motion.div key={k.label} variants={item} className={`glass-card-${k.color} p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <k.icon className={`w-4 h-4 text-kitchen-${k.color}`} />
            <span className="text-sm text-muted-foreground">{k.label}</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="stat-value text-2xl">{k.value}</span>
            <span className="text-xs text-muted-foreground mb-1">{k.unit}</span>
          </div>
          <div className={`flex items-center gap-1 mt-2 text-xs ${k.change < 0 ? "text-kitchen-green" : "text-kitchen-orange"}`}>
            {k.change < 0 ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
            {Math.abs(k.change)}% 较昨日
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Area chart - spans 2 cols */}
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />今日能耗趋势
        </h3>
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

      {/* Weekly cost bar chart */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-semibold text-sm mb-4">本周费用统计</h3>
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

    {/* Equipment energy ranking */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="font-semibold text-sm mb-4">设备能耗排行</h3>
      <div className="space-y-3">
        {[
          { name: "智能烤箱 A1", val: 186, pct: 100 },
          { name: "蒸汽炉 B2", val: 142, pct: 76 },
          { name: "油炸机 C1", val: 128, pct: 69 },
          { name: "消毒柜 F1", val: 95, pct: 51 },
          { name: "冷藏柜 D1", val: 78, pct: 42 },
        ].map((e, i) => (
          <div key={e.name} className="flex items-center gap-3">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{i + 1}</span>
            <span className="text-sm w-28 shrink-0">{e.name}</span>
            <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" initial={{ width: 0 }} animate={{ width: `${e.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
            </div>
            <span className="text-sm font-display w-16 text-right">{e.val} kWh</span>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Energy;
