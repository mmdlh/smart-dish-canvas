import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Gauge, AlertTriangle, TrendingUp, TrendingDown, Minus, MapPin, Clock, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const zones = [
  { name: "主厨区", temp: 26.5, humidity: 55, airQuality: 92, pm25: 15, co2: 620, noise: 65, status: "normal" },
  { name: "冷菜间", temp: 18.2, humidity: 40, airQuality: 98, pm25: 5, co2: 420, noise: 35, status: "normal" },
  { name: "烘焙区", temp: 32.1, humidity: 35, airQuality: 78, pm25: 28, co2: 780, noise: 58, status: "warning" },
  { name: "仓储区", temp: 15.0, humidity: 45, airQuality: 95, pm25: 8, co2: 380, noise: 30, status: "normal" },
  { name: "洗消间", temp: 28.8, humidity: 72, airQuality: 85, pm25: 18, co2: 550, noise: 70, status: "normal" },
  { name: "面点间", temp: 24.3, humidity: 50, airQuality: 90, pm25: 12, co2: 490, noise: 45, status: "normal" },
];

const tempHistory = Array.from({ length: 12 }, (_, i) => ({
  time: `${String(6 + i * 1.5).padStart(2, "0")}:00`,
  主厨区: 22 + Math.sin(i / 2) * 5 + Math.random() * 2,
  冷菜间: 16 + Math.cos(i / 3) * 3 + Math.random(),
  烘焙区: 28 + Math.sin(i / 1.5) * 4 + Math.random() * 2,
})).map(d => ({ ...d, 主厨区: +d.主厨区.toFixed(1), 冷菜间: +d.冷菜间.toFixed(1), 烘焙区: +d.烘焙区.toFixed(1) }));

const envAlerts = [
  { zone: "烘焙区", type: "温度超标", value: "32.1°C → 阈值30°C", time: "14:20", status: "active" },
  { zone: "洗消间", type: "湿度偏高", value: "72% → 阈值70%", time: "13:50", status: "active" },
  { zone: "烘焙区", type: "PM2.5偏高", value: "28μg/m³ → 阈值25", time: "12:30", status: "resolved" },
];

const GaugeCircle = ({ value, max, label, unit, color }: { value: number; max: number; label: string; unit: string; color: string }) => {
  const pct = (value / max) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ * 0.75;
  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="55" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="6" strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeLinecap="round" transform="rotate(135 50 55)" />
        <motion.circle cx="50" cy="55" r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(135 50 55)"
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text x="50" y="52" textAnchor="middle" className="fill-foreground font-display text-lg font-bold">{value}</text>
        <text x="50" y="66" textAnchor="middle" className="fill-muted-foreground text-[10px]">{unit}</text>
      </svg>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
};

const trend = (v: number) => v > 25 ? <TrendingUp className="w-3.5 h-3.5 text-kitchen-orange" /> : v < 20 ? <TrendingDown className="w-3.5 h-3.5 text-kitchen-green" /> : <Minus className="w-3.5 h-3.5 text-muted-foreground" />;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } };

const Environment = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Overview gauges */}
    <motion.div variants={item} className="glass-card p-6">
      <h2 className="section-title"><Gauge className="w-4 h-4 text-primary" />环境总览</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        <GaugeCircle value={24.8} max={50} label="平均温度" unit="°C" color="hsl(185, 75%, 40%)" />
        <GaugeCircle value={49.5} max={100} label="平均湿度" unit="%" color="hsl(215, 85%, 55%)" />
        <GaugeCircle value={89.7} max={100} label="空气质量" unit="AQI" color="hsl(155, 65%, 42%)" />
        <GaugeCircle value={14.3} max={75} label="PM2.5" unit="μg/m³" color="hsl(260, 60%, 55%)" />
        <GaugeCircle value={540} max={1000} label="CO₂浓度" unit="ppm" color="hsl(28, 90%, 55%)" />
        <GaugeCircle value={50.5} max={85} label="平均噪音" unit="dB" color="hsl(170, 60%, 38%)" />
      </div>
    </motion.div>

    {/* Zone cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {zones.map((z) => (
        <motion.div key={z.name} variants={item} className={`glass-card p-5 ${z.status === "warning" ? "ring-1 ring-kitchen-orange/40" : ""} hover:-translate-y-0.5 transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">{z.name}</h3>
            </div>
            {z.status === "warning" && <AlertTriangle className="w-4 h-4 text-kitchen-orange animate-pulse" />}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2 bg-kitchen-cyan-light rounded-lg p-2.5">
              <Thermometer className="w-4 h-4 text-kitchen-cyan shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">温度</p>
                <p className="font-display text-sm font-semibold flex items-center gap-1">{z.temp}°C {trend(z.temp)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-blue-light rounded-lg p-2.5">
              <Droplets className="w-4 h-4 text-kitchen-blue shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">湿度</p>
                <p className="font-display text-sm font-semibold">{z.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-green-light rounded-lg p-2.5">
              <Wind className="w-4 h-4 text-kitchen-green shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">空气质量</p>
                <p className="font-display text-sm font-semibold">{z.airQuality}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-purple-light rounded-lg p-2.5">
              <Gauge className="w-4 h-4 text-kitchen-purple shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">PM2.5</p>
                <p className="font-display text-sm font-semibold">{z.pm25}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-orange-light rounded-lg p-2.5">
              <Eye className="w-4 h-4 text-kitchen-orange shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">CO₂</p>
                <p className="font-display text-sm font-semibold">{z.co2} ppm</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-teal-light rounded-lg p-2.5">
              <Gauge className="w-4 h-4 text-kitchen-teal shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">噪音</p>
                <p className="font-display text-sm font-semibold">{z.noise} dB</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom: temperature trend chart + env alerts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="section-title"><TrendingUp className="w-4 h-4 text-primary" />温度变化趋势</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={tempHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,25%,90%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" domain={[10, 40]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Line type="monotone" dataKey="主厨区" stroke="hsl(185,75%,40%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="冷菜间" stroke="hsl(215,85%,55%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="烘焙区" stroke="hsl(28,90%,55%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><AlertTriangle className="w-4 h-4 text-kitchen-orange" />环境告警</h3>
        <div className="space-y-3">
          {envAlerts.map((a, i) => (
            <div key={i} className={`p-3 rounded-lg border ${a.status === "active" ? "bg-kitchen-orange-light/30 border-kitchen-orange/20" : "bg-secondary/30 border-border/50"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{a.zone} · {a.type}</span>
                <span className={`mini-badge ${a.status === "active" ? "bg-kitchen-orange-light text-kitchen-orange" : "bg-kitchen-green-light text-kitchen-green"}`}>
                  {a.status === "active" ? "未处理" : "已恢复"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{a.value}</p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{a.time}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Environment;
