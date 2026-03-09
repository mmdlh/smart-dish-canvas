import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle, Bell, Clock, MapPin, CheckCircle2, XCircle, Flame, Droplets, Bug, Zap, Camera, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const stats = [
  { label: "安全运行", value: "127", unit: "天", icon: ShieldCheck, color: "green" },
  { label: "今日告警", value: "3", unit: "条", icon: AlertTriangle, color: "orange" },
  { label: "已处理", value: "2", unit: "条", icon: CheckCircle2, color: "cyan" },
  { label: "待处理", value: "1", unit: "条", icon: Bell, color: "red" },
  { label: "巡检完成", value: "67", unit: "%", icon: FileText, color: "blue" },
  { label: "在岗人员", value: "18", unit: "人", icon: Users, color: "purple" },
];

const alerts = [
  { id: 1, type: "fire", title: "烘焙区温度过高", desc: "烘焙区环境温度达到38.5°C，超过安全阈值35°C，已持续15分钟", location: "B区-烘焙间", time: "14:32", level: "high", status: "pending", icon: Flame },
  { id: 2, type: "leak", title: "洗消间水管压力异常", desc: "3号水管压力降至0.15MPa，可能存在泄漏风险，建议立即排查", location: "E区-洗消间", time: "11:20", level: "medium", status: "resolved", icon: Droplets },
  { id: 3, type: "pest", title: "仓储区异常活动检测", desc: "红外传感器检测到非工作时段异常活动，已启动监控录像回放", location: "D区-仓储区", time: "03:15", level: "low", status: "resolved", icon: Bug },
  { id: 4, type: "electric", title: "油炸机功率波动", desc: "C1油炸机功率在过去1小时内波动超过15%，建议检查电路连接", location: "A区-主厨区", time: "09:45", level: "medium", status: "pending", icon: Zap },
  { id: 5, type: "camera", title: "3号监控摄像头离线", desc: "冷菜间3号摄像头信号中断，可能是网络故障", location: "C区-冷菜间", time: "08:30", level: "low", status: "resolved", icon: Camera },
];

const levelStyle: Record<string, string> = { high: "bg-kitchen-red-light text-kitchen-red", medium: "bg-kitchen-orange-light text-kitchen-orange", low: "bg-kitchen-cyan-light text-kitchen-cyan" };
const levelLabel: Record<string, string> = { high: "高危", medium: "中等", low: "低危" };

const checkItems = [
  { name: "燃气安全检查", done: true, lastCheck: "08:00", checker: "张工" },
  { name: "消防设备巡检", done: true, lastCheck: "08:30", checker: "李工" },
  { name: "排烟系统检测", done: false, lastCheck: "--", checker: "--" },
  { name: "用电安全检查", done: true, lastCheck: "09:00", checker: "王工" },
  { name: "食品留样记录", done: true, lastCheck: "12:30", checker: "陈厨" },
  { name: "环境卫生检查", done: false, lastCheck: "--", checker: "--" },
  { name: "冷链温度核查", done: true, lastCheck: "10:15", checker: "赵工" },
  { name: "刀具消毒记录", done: true, lastCheck: "11:00", checker: "周厨" },
];

const alertTypePie = [
  { name: "温度", value: 35 }, { name: "设备", value: 28 },
  { name: "电气", value: 18 }, { name: "环境", value: 12 }, { name: "其他", value: 7 },
];
const PIE_COLORS = ["hsl(0,75%,55%)", "hsl(28,90%,55%)", "hsl(185,75%,40%)", "hsl(155,65%,42%)", "hsl(260,60%,55%)"];

const safetyScores = [
  { area: "消防安全", score: 96, max: 100 },
  { area: "食品卫生", score: 92, max: 100 },
  { area: "设备安全", score: 88, max: 100 },
  { area: "用电安全", score: 94, max: 100 },
  { area: "人员防护", score: 90, max: 100 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } };

const Safety = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((s) => (
        <motion.div key={s.label} variants={item} className={`glass-card-${s.color} p-4 flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-xl bg-kitchen-${s.color}-light flex items-center justify-center shrink-0`}>
            <s.icon className={`w-5 h-5 text-kitchen-${s.color}`} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="stat-value text-lg">{s.value}<span className="text-[11px] text-muted-foreground ml-0.5">{s.unit}</span></p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Alert list */}
      <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
        <h3 className="section-title"><ShieldAlert className="w-4 h-4 text-primary" />告警记录</h3>
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${a.status === "pending" ? "bg-kitchen-orange-light/30 border-kitchen-orange/20" : "bg-secondary/30 border-border/50"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.status === "pending" ? "bg-kitchen-orange-light" : "bg-secondary"}`}>
                  <a.icon className={`w-4 h-4 ${a.status === "pending" ? "text-kitchen-orange" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm">{a.title}</span>
                    <span className={`mini-badge ${levelStyle[a.level]}`}>{levelLabel[a.level]}</span>
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

      {/* Right column: checklist + pie */}
      <div className="space-y-4">
        <motion.div variants={item} className="glass-card p-5">
          <h3 className="section-title"><CheckCircle2 className="w-4 h-4 text-primary" />今日巡检</h3>
          <div className="space-y-2">
            {checkItems.map((c) => (
              <div key={c.name} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                {c.done ? <CheckCircle2 className="w-4 h-4 text-kitchen-green shrink-0" /> : <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />}
                <span className={`text-sm flex-1 ${c.done ? "" : "text-muted-foreground"}`}>{c.name}</span>
                <span className="text-[11px] text-muted-foreground">{c.checker}</span>
                <span className="text-[11px] text-muted-foreground w-10">{c.lastCheck}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between text-sm items-center">
              <span className="text-muted-foreground">完成进度</span>
              <span className="font-display font-semibold text-primary">6/8</span>
            </div>
            <Progress value={75} className="h-1.5 mt-2" />
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5">
          <h3 className="section-title">告警类型分布</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={alertTypePie} innerRadius={28} outerRadius={50} dataKey="value" stroke="none">
                  {alertTypePie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {alertTypePie.map((a, i) => (
                <div key={a.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="flex-1">{a.name}</span>
                  <span className="text-muted-foreground font-display">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Safety scores */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="section-title"><ShieldCheck className="w-4 h-4 text-primary" />安全评估评分</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {safetyScores.map((s) => (
          <div key={s.area} className="text-center p-4 rounded-lg bg-secondary/30 border border-border/30">
            <p className="text-xs text-muted-foreground mb-2">{s.area}</p>
            <p className={`font-display text-2xl font-bold ${s.score >= 95 ? "text-kitchen-green" : s.score >= 90 ? "text-kitchen-cyan" : "text-kitchen-orange"}`}>
              {s.score}
            </p>
            <p className="text-[11px] text-muted-foreground">/ {s.max}</p>
            <Progress value={s.score} className="h-1 mt-2" />
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Safety;
