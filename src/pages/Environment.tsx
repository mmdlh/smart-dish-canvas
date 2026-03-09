import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Gauge, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";

const zones = [
  { name: "主厨区", temp: 26.5, humidity: 55, airQuality: 92, pm25: 15, status: "normal" },
  { name: "冷菜间", temp: 18.2, humidity: 40, airQuality: 98, pm25: 5, status: "normal" },
  { name: "烘焙区", temp: 32.1, humidity: 35, airQuality: 78, pm25: 28, status: "warning" },
  { name: "仓储区", temp: 15.0, humidity: 45, airQuality: 95, pm25: 8, status: "normal" },
  { name: "洗消间", temp: 28.8, humidity: 72, airQuality: 85, pm25: 18, status: "normal" },
  { name: "面点间", temp: 24.3, humidity: 50, airQuality: 90, pm25: 12, status: "normal" },
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
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
        <text x="50" y="52" textAnchor="middle" className="fill-foreground font-display text-lg font-bold">{value}</text>
        <text x="50" y="66" textAnchor="middle" className="fill-muted-foreground text-[10px]">{unit}</text>
      </svg>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
};

const trend = (v: number) => v > 25 ? <TrendingUp className="w-3.5 h-3.5 text-kitchen-orange" /> : v < 20 ? <TrendingDown className="w-3.5 h-3.5 text-kitchen-green" /> : <Minus className="w-3.5 h-3.5 text-muted-foreground" />;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

const Environment = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Overview gauges */}
    <motion.div variants={item} className="glass-card p-6">
      <h2 className="font-semibold mb-4 flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" />环境总览</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        <GaugeCircle value={24.8} max={50} label="平均温度" unit="°C" color="hsl(185, 75%, 40%)" />
        <GaugeCircle value={49.5} max={100} label="平均湿度" unit="%" color="hsl(215, 85%, 55%)" />
        <GaugeCircle value={89.7} max={100} label="空气质量" unit="AQI" color="hsl(155, 65%, 42%)" />
        <GaugeCircle value={14.3} max={75} label="PM2.5" unit="μg/m³" color="hsl(260, 60%, 55%)" />
      </div>
    </motion.div>

    {/* Zone cards - 2 col layout with alternating sizes */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {zones.map((z) => (
        <motion.div key={z.name} variants={item} className={`glass-card p-5 ${z.status === "warning" ? "ring-1 ring-kitchen-orange/40" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">{z.name}</h3>
            {z.status === "warning" && <AlertTriangle className="w-4 h-4 text-kitchen-orange animate-pulse" />}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-kitchen-cyan-light rounded-lg p-2.5">
              <Thermometer className="w-4 h-4 text-kitchen-cyan" />
              <div>
                <p className="text-xs text-muted-foreground">温度</p>
                <p className="font-display text-sm font-semibold flex items-center gap-1">{z.temp}°C {trend(z.temp)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-blue-light rounded-lg p-2.5">
              <Droplets className="w-4 h-4 text-kitchen-blue" />
              <div>
                <p className="text-xs text-muted-foreground">湿度</p>
                <p className="font-display text-sm font-semibold">{z.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-green-light rounded-lg p-2.5">
              <Wind className="w-4 h-4 text-kitchen-green" />
              <div>
                <p className="text-xs text-muted-foreground">空气质量</p>
                <p className="font-display text-sm font-semibold">{z.airQuality}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-kitchen-purple-light rounded-lg p-2.5">
              <Gauge className="w-4 h-4 text-kitchen-purple" />
              <div>
                <p className="text-xs text-muted-foreground">PM2.5</p>
                <p className="font-display text-sm font-semibold">{z.pm25}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Environment;
