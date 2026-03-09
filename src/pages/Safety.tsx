import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle, Bell, Clock, MapPin, CheckCircle2, XCircle, Flame, Droplets, Bug, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "安全运行", value: "127", unit: "天", icon: ShieldCheck, color: "green" },
  { label: "今日告警", value: "3", unit: "条", icon: AlertTriangle, color: "orange" },
  { label: "已处理", value: "2", unit: "条", icon: CheckCircle2, color: "cyan" },
  { label: "待处理", value: "1", unit: "条", icon: Bell, color: "red" },
];

const alerts = [
  { id: 1, type: "fire", title: "烘焙区温度过高", desc: "烘焙区环境温度达到38.5°C，超过安全阈值35°C", location: "B区-烘焙间", time: "14:32", level: "high", status: "pending", icon: Flame },
  { id: 2, type: "leak", title: "洗消间水管压力异常", desc: "3号水管压力降至0.15MPa，可能存在泄漏风险", location: "E区-洗消间", time: "11:20", level: "medium", status: "resolved", icon: Droplets },
  { id: 3, type: "pest", title: "仓储区异常活动检测", desc: "红外传感器检测到非工作时段异常活动", location: "D区-仓储区", time: "03:15", level: "low", status: "resolved", icon: Bug },
  { id: 4, type: "electric", title: "油炸机功率波动", desc: "C1油炸机功率在过去1小时内波动超过15%", location: "A区-主厨区", time: "09:45", level: "medium", status: "pending", icon: Zap },
];

const levelStyle: Record<string, string> = { high: "bg-kitchen-red-light text-kitchen-red", medium: "bg-kitchen-orange-light text-kitchen-orange", low: "bg-kitchen-cyan-light text-kitchen-cyan" };
const levelLabel: Record<string, string> = { high: "高危", medium: "中等", low: "低危" };

const checkItems = [
  { name: "燃气安全检查", done: true, lastCheck: "08:00" },
  { name: "消防设备巡检", done: true, lastCheck: "08:30" },
  { name: "排烟系统检测", done: false, lastCheck: "--" },
  { name: "用电安全检查", done: true, lastCheck: "09:00" },
  { name: "食品留样记录", done: true, lastCheck: "12:30" },
  { name: "环境卫生检查", done: false, lastCheck: "--" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } };

const Safety = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Stats row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <motion.div key={s.label} variants={item} className={`glass-card-${s.color} p-5 flex items-center gap-3`}>
          <div className={`w-11 h-11 rounded-xl bg-kitchen-${s.color}-light flex items-center justify-center`}>
            <s.icon className={`w-5 h-5 text-kitchen-${s.color}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="stat-value text-xl">{s.value}<span className="text-xs text-muted-foreground ml-1">{s.unit}</span></p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Alert list - 2 cols */}
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-primary" />告警记录</h3>
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className={`p-4 rounded-lg border transition-colors ${a.status === "pending" ? "bg-kitchen-orange-light/30 border-kitchen-orange/20" : "bg-secondary/30 border-border"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.status === "pending" ? "bg-kitchen-orange-light" : "bg-secondary"}`}>
                  <a.icon className={`w-4 h-4 ${a.status === "pending" ? "text-kitchen-orange" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm">{a.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${levelStyle[a.level]}`}>{levelLabel[a.level]}</span>
                    {a.status === "resolved" ? (
                      <Badge variant="secondary" className="text-xs gap-1"><CheckCircle2 className="w-3 h-3 text-kitchen-green" />已处理</Badge>
                    ) : (
                      <Badge className="text-xs bg-kitchen-orange text-primary-foreground gap-1"><Clock className="w-3 h-3" />待处理</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{a.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily checklist */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />今日巡检</h3>
        <div className="space-y-2">
          {checkItems.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/40 transition-colors">
              {c.done ? <CheckCircle2 className="w-4 h-4 text-kitchen-green shrink-0" /> : <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />}
              <span className={`text-sm flex-1 ${c.done ? "" : "text-muted-foreground"}`}>{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.lastCheck}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">完成进度</span>
            <span className="font-display font-semibold text-primary">4/6</span>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default Safety;
