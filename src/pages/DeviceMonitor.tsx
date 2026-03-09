import { motion } from "framer-motion";
import { Monitor, Wifi, WifiOff, Power, Clock, Cpu, ThermometerSun } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const devices = [
  { name: "智能烤箱 A1", status: "online", temp: "185°C", usage: 72, uptime: "48h 23m", model: "KX-9000 Pro", icon: ThermometerSun, color: "cyan" },
  { name: "蒸汽炉 B2", status: "online", temp: "100°C", usage: 45, uptime: "12h 05m", model: "ZQ-6000", icon: Monitor, color: "blue" },
  { name: "油炸机 C1", status: "warning", temp: "178°C", usage: 88, uptime: "6h 12m", model: "YZ-3500", icon: ThermometerSun, color: "orange" },
  { name: "冷藏柜 D1", status: "online", temp: "-18°C", usage: 30, uptime: "720h", model: "LC-8800", icon: Cpu, color: "green" },
  { name: "洗碗机 E1", status: "offline", temp: "--", usage: 0, uptime: "--", model: "XW-2200", icon: Monitor, color: "purple" },
  { name: "消毒柜 F1", status: "online", temp: "125°C", usage: 55, uptime: "3h 40m", model: "XD-4400", icon: Cpu, color: "cyan" },
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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const DeviceMonitor = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Summary bar */}
    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "设备总数", value: "24", sub: "台", color: "text-kitchen-cyan" },
        { label: "在线设备", value: "21", sub: "台", color: "text-kitchen-green" },
        { label: "告警设备", value: "2", sub: "台", color: "text-kitchen-orange" },
        { label: "离线设备", value: "1", sub: "台", color: "text-kitchen-red" },
      ].map((s) => (
        <div key={s.label} className="glass-card p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
          <p className={`stat-value text-2xl ${s.color}`}>{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </motion.div>

    {/* Device grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((d) => {
        const st = statusMap[d.status];
        const Icon = d.icon;
        return (
          <motion.div key={d.name} variants={item} className={`${colorBorder[d.color]} p-5 hover:shadow-lg transition-shadow duration-300`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`status-dot ${st.dot}`} />
                <span className="text-xs">{st.label}</span>
              </div>
            </div>

            <div className="space-y-3">
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
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default DeviceMonitor;
