import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Database, Palette, Globe, HelpCircle, ChevronRight, ToggleLeft, ToggleRight, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const sections = [
  { icon: User, title: "账户信息", desc: "管理用户名、密码和基本信息" },
  { icon: Bell, title: "通知设置", desc: "配置告警推送和消息提醒" },
  { icon: Shield, title: "安全设置", desc: "双重认证、登录日志和权限管理" },
  { icon: Database, title: "数据管理", desc: "备份策略、数据导出和清理" },
  { icon: Globe, title: "网络配置", desc: "设备连接、WiFi和远程访问" },
  { icon: HelpCircle, title: "帮助支持", desc: "使用指南、常见问题和技术支持" },
];

const SettingsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
    {/* Profile card */}
    <motion.div variants={item} className="glass-card-cyan p-6 flex items-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-bold font-display">
        管
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-lg">管理员</h2>
        <p className="text-sm text-muted-foreground">admin@smartkitchen.cn</p>
        <p className="text-xs text-muted-foreground mt-1">上次登录：2026-03-09 08:30</p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">编辑资料</button>
    </motion.div>

    {/* Quick settings */}
    <motion.div variants={item} className="glass-card p-5 space-y-4">
      <h3 className="font-semibold text-sm flex items-center gap-2"><Settings className="w-4 h-4 text-primary" />快捷设置</h3>
      <div className="space-y-4">
        {[
          { label: "设备异常告警", desc: "当设备出现异常时推送通知", on: true },
          { label: "温度超标提醒", desc: "环境温度超过阈值时立即告警", on: true },
          { label: "库存不足提醒", desc: "食材库存低于安全线时通知", on: true },
          { label: "每日报表推送", desc: "每日自动发送运营数据报表", on: false },
          { label: "节能模式", desc: "非营业时段自动降低设备功率", on: false },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <Switch defaultChecked={s.on} />
          </div>
        ))}
      </div>
    </motion.div>

    {/* Threshold settings */}
    <motion.div variants={item} className="glass-card p-5 space-y-4">
      <h3 className="font-semibold text-sm flex items-center gap-2"><Palette className="w-4 h-4 text-primary" />阈值配置</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "温度上限 (°C)", value: "35" },
          { label: "温度下限 (°C)", value: "-25" },
          { label: "湿度上限 (%)", value: "75" },
          { label: "PM2.5 告警值", value: "50" },
        ].map((t) => (
          <div key={t.label} className="space-y-1.5">
            <Label className="text-sm">{t.label}</Label>
            <Input defaultValue={t.value} className="font-display" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
          <Save className="w-4 h-4" />保存设置
        </button>
      </div>
    </motion.div>

    {/* Section links */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sections.map((s) => (
        <motion.div key={s.title} variants={item} className="glass-card p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SettingsPage;
