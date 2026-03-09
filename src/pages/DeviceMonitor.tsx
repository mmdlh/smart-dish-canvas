import { motion } from "framer-motion";
import { Monitor, Wifi, WifiOff, Power, Clock, Cpu, ThermometerSun, Activity, AlertTriangle, CheckCircle2, Settings, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const devices = [
  { name: "智能烤箱 A1", status: "online", temp: "185°C", usage: 72, uptime: "48h 23m", model: "KX-9000 Pro", icon: ThermometerSun, color: "cyan", power: 4.2 },
  { name: "蒸汽炉 B2", status: "online", temp: "100°C", usage: 45, uptime: "12h 05m", model: "ZQ-6000", icon: Monitor, color: "blue", power: 3.1 },
  { name: "油炸机 C1", status: "warning", temp: "178°C", usage: 88, uptime: "6h 12m", model: "YZ-3500", icon: ThermometerSun, color: "orange", power: 5.5 },
  { name: "冷藏柜 D1", status: "online", temp: "-18°C", usage: 30, uptime: "720h", model: "LC-8800", icon: Cpu, color: "green", power: 1.8 },
  { name: "洗碗机 E1", status: "offline", temp: "--", usage: 0, uptime: "--", model: "XW-2200", icon: Monitor, color: "purple", power: 0 },
  { name: "消毒柜 F1", status: "online", temp: "125°C", usage: 55, uptime: "3h 40m", model: "XD-4400", icon: Cpu, color: "cyan", power: 2.4 },
  { name: "和面机 G1", status: "online", temp: "28°C", usage: 62, uptime: "2h 15m", model: "HM-1200", icon: Settings, color: "blue", power: 1.5 },
  { name: "切菜机 H1", status: "online", temp: "22°C", usage: 35, uptime: "4h 30m", model: "QC-800", icon: Cpu, color: "green", power: 0.8 },
];

const statusMap: Record<string, { label: string; dot: string }> = {
  online: { label: "运行中", dot: "bg-kitchen-green" },
  warning: { label: "告警", dot: "bg-kitchen-orange" },
  offline: { label: "离线", dot: "bg-kitchen-red" },
};

const colorBorder: Record<string, string> = {
  cyan: "glass-card-cyan", blue: "glass-card-blue", green: "glass-card-green",
  orange: "glass-card-orange", purple: "glass-card-purple",
};

const recentLogs = [
  { time: "14:32", device: "油炸机 C1", event: "温度超过安全阈值 175°C", level: "warning" },
  { time: "13:15", device: "智能烤箱 A1", event: "完成预热，进入工作模式", level: "info" },
  { time: "12:50", device: "冷藏柜 D1", event: "自动除霜完成", level: "info" },
  { time: "11:30", device: "洗碗机 E1", event: "设备断开连接", level: "error" },
  { time: "10:20", device: "蒸汽炉 B2", event: "水箱水位已补充", level: "info" },
  { time: "09:05", device: "消毒柜 F1", event: "紫外线灯管寿命剩余 80%", level: "info" },
];

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  cpu: Math.round(30 + Math.random() * 50),
  mem: Math.round(40 + Math.random() * 35),
}));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const DeviceMonitor = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Summary bar */}
    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[
        { label: "设备总数", value: "24", sub: "台", color: "text-kitchen-cyan", cls: "glass-card-cyan" },
        { label: "在线设备", value: "21", sub: "台", color: "text-kitchen-green", cls: "glass-card-green" },
        { label: "告警设备", value: "2", sub: "台", color: "text-kitchen-orange", cls: "glass-card-orange" },
        { label: "离线设备", value: "1", sub: "台", color: "text-kitchen-red", cls: "glass-card-red" },
        { label: "总功率", value: "19.3", sub: "kW", color: "text-kitchen-blue", cls: "glass-card-blue" },
        { label: "运行效率", value: "87.5", sub: "%", color: "text-kitchen-purple", cls: "glass-card-purple" },
      ].map((s) => (
        <div key={s.label} className={`${s.cls} p-4 text-center`}>
          <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
          <p className="stat-value text-2xl">{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </motion.div>

    {/* Device grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {devices.map((d) => {
        const st = statusMap[d.status];
        const Icon = d.icon;
        return (
          <motion.div key={d.name} variants={item} className={`${colorBorder[d.color]} p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{d.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{d.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`status-dot ${st.dot}`} />
                <span className="text-xs">{st.label}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><ThermometerSun className="w-3.5 h-3.5" />温度</span>
                <span className="font-medium font-display text-sm">{d.temp}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><Power className="w-3.5 h-3.5" />负载</span>
                  <span className="font-medium">{d.usage}%</span>
                </div>
                <Progress value={d.usage} className="h-1.5" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" />运行</span>
                <span className="font-medium">{d.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  {d.status === "offline" ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                  网络
                </span>
                <span className="font-medium">{d.status === "offline" ? "断开" : "已连接"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3.5 h-3.5" />功率</span>
                <span className="font-display text-sm font-medium">{d.power} kW</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Bottom section: performance chart + event log */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Performance chart */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><BarChart3 className="w-4 h-4 text-primary" />系统性能监控 (24h)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185,75%,40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(185,75%,40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(260,60%,55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(260,60%,55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" interval={3} />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(210,10%,50%)" domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(200,25%,90%)" }} />
            <Area type="monotone" dataKey="cpu" stroke="hsl(185,75%,40%)" fill="url(#cpuGrad)" strokeWidth={2} name="CPU %" />
            <Area type="monotone" dataKey="mem" stroke="hsl(260,60%,55%)" fill="url(#memGrad)" strokeWidth={2} name="内存 %" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Event log */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title"><Activity className="w-4 h-4 text-primary" />设备运行日志</h3>
        <div className="space-y-2.5">
          {recentLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/40 transition-colors">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                log.level === "warning" ? "bg-kitchen-orange-light" : log.level === "error" ? "bg-kitchen-red-light" : "bg-kitchen-cyan-light"
              }`}>
                {log.level === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-kitchen-orange" /> :
                 log.level === "error" ? <WifiOff className="w-3.5 h-3.5 text-kitchen-red" /> :
                 <CheckCircle2 className="w-3.5 h-3.5 text-kitchen-cyan" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{log.device}</span>
                  <span className="text-[11px] text-muted-foreground font-display">{log.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{log.event}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Maintenance schedule */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="section-title"><Settings className="w-4 h-4 text-primary" />维护计划</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { device: "智能烤箱 A1", task: "加热管检查", date: "2026-03-12", status: "即将" },
          { device: "油炸机 C1", task: "油温传感器校准", date: "2026-03-10", status: "紧急" },
          { device: "洗碗机 E1", task: "电路板维修", date: "2026-03-09", status: "进行中" },
          { device: "蒸汽炉 B2", task: "水垢清理", date: "2026-03-15", status: "计划中" },
        ].map((m) => (
          <div key={m.device} className="p-3 rounded-lg bg-secondary/40 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{m.device}</span>
              <span className={`mini-badge ${
                m.status === "紧急" ? "bg-kitchen-red-light text-kitchen-red" :
                m.status === "进行中" ? "bg-kitchen-orange-light text-kitchen-orange" :
                m.status === "即将" ? "bg-kitchen-cyan-light text-kitchen-cyan" :
                "bg-secondary text-muted-foreground"
              }`}>{m.status}</span>
            </div>
            <p className="text-xs text-muted-foreground">{m.task}</p>
            <p className="text-xs text-muted-foreground mt-1 font-display">{m.date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

// Fix missing import
import { Zap } from "lucide-react";

export default DeviceMonitor;
