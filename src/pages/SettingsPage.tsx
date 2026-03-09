import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Database, Palette, Globe, HelpCircle, ChevronRight, Save, Monitor, Clock, Wifi, Server, Download, Upload, Key, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const sections = [
  { icon: User, title: "账户信息", desc: "管理用户名、密码和基本信息" },
  { icon: Bell, title: "通知设置", desc: "配置告警推送和消息提醒" },
  { icon: Shield, title: "安全设置", desc: "双重认证、登录日志和权限管理" },
  { icon: Database, title: "数据管理", desc: "备份策略、数据导出和清理" },
  { icon: Globe, title: "网络配置", desc: "设备连接、WiFi和远程访问" },
  { icon: HelpCircle, title: "帮助支持", desc: "使用指南、常见问题和技术支持" },
];

const systemInfo = [
  { label: "系统版本", value: "v2.6.0", icon: Monitor },
  { label: "上次更新", value: "2026-03-01", icon: Clock },
  { label: "网络延迟", value: "12ms", icon: Wifi },
  { label: "服务器状态", value: "正常", icon: Server },
  { label: "数据库大小", value: "2.4 GB", icon: Database },
  { label: "API密钥", value: "sk-***8f3d", icon: Key },
];

const storageUsage = [
  { name: "数据库", used: 2.4, total: 10, color: "kitchen-cyan" },
  { name: "文件存储", used: 5.8, total: 20, color: "kitchen-blue" },
  { name: "日志存储", used: 1.2, total: 5, color: "kitchen-green" },
  { name: "备份空间", used: 8.5, total: 15, color: "kitchen-purple" },
];

const recentActivities = [
  { action: "修改温度阈值", user: "管理员", time: "10分钟前", icon: Palette },
  { action: "导出月度报表", user: "管理员", time: "1小时前", icon: Download },
  { action: "更新设备固件", user: "系统", time: "3小时前", icon: Upload },
  { action: "新增操作员账号", user: "管理员", time: "昨天 16:30", icon: User },
  { action: "修改通知规则", user: "管理员", time: "昨天 14:20", icon: Bell },
  { action: "发送系统邮件", user: "系统", time: "昨天 08:00", icon: Mail },
];

const SettingsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
    {/* Profile card */}
    <motion.div variants={item} className="glass-card-cyan p-6 flex flex-wrap items-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-bold font-display shadow-lg">
        管
      </div>
      <div className="flex-1 min-w-[200px]">
        <h2 className="font-semibold text-lg">管理员</h2>
        <p className="text-sm text-muted-foreground">admin@smartkitchen.cn</p>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />上次登录：2026-03-09 08:30 · IP: 192.168.1.100</p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition shadow-sm">编辑资料</button>
    </motion.div>

    {/* System info */}
    <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {systemInfo.map((s) => (
        <div key={s.label} className="glass-card p-3 flex items-center gap-2.5">
          <s.icon className="w-4 h-4 text-primary shrink-0" />
          <div>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="text-sm font-medium font-display">{s.value}</p>
          </div>
        </div>
      ))}
    </motion.div>

    {/* Settings + storage */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Quick settings */}
      <motion.div variants={item} className="glass-card p-5 space-y-4">
        <h3 className="section-title"><Settings className="w-4 h-4 text-primary" />快捷设置</h3>
        <div className="space-y-3">
          {[
            { label: "设备异常告警", desc: "当设备出现异常时推送通知", on: true },
            { label: "温度超标提醒", desc: "环境温度超过阈值时立即告警", on: true },
            { label: "库存不足提醒", desc: "食材库存低于安全线时通知", on: true },
            { label: "每日报表推送", desc: "每日自动发送运营数据报表", on: false },
            { label: "节能模式", desc: "非营业时段自动降低设备功率", on: false },
            { label: "自动备份", desc: "每日凌晨自动备份系统数据", on: true },
            { label: "远程访问", desc: "允许通过外网访问管理系统", on: false },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-[11px] text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.on} />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {/* Storage */}
        <motion.div variants={item} className="glass-card p-5">
          <h3 className="section-title"><Database className="w-4 h-4 text-primary" />存储使用情况</h3>
          <div className="space-y-3">
            {storageUsage.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground font-display text-xs">{s.used} / {s.total} GB</span>
                </div>
                <Progress value={(s.used / s.total) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent activities */}
        <motion.div variants={item} className="glass-card p-5">
          <h3 className="section-title"><Clock className="w-4 h-4 text-primary" />最近操作</h3>
          <div className="space-y-2">
            {recentActivities.map((a, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                  <a.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{a.action}</p>
                  <p className="text-[11px] text-muted-foreground">{a.user} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Threshold settings */}
    <motion.div variants={item} className="glass-card p-5 space-y-4">
      <h3 className="section-title"><Palette className="w-4 h-4 text-primary" />阈值配置</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "温度上限 (°C)", value: "35" },
          { label: "温度下限 (°C)", value: "-25" },
          { label: "湿度上限 (%)", value: "75" },
          { label: "PM2.5 告警值", value: "50" },
          { label: "CO₂ 告警值 (ppm)", value: "1000" },
          { label: "噪音上限 (dB)", value: "80" },
          { label: "设备负载上限 (%)", value: "90" },
          { label: "水压下限 (MPa)", value: "0.2" },
        ].map((t) => (
          <div key={t.label} className="space-y-1.5">
            <Label className="text-sm">{t.label}</Label>
            <Input defaultValue={t.value} className="font-display" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button className="px-4 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition">重置默认</button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition shadow-sm">
          <Save className="w-4 h-4" />保存设置
        </button>
      </div>
    </motion.div>

    {/* Section links */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {sections.map((s) => (
        <motion.div key={s.title} variants={item} className="glass-card p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{s.title}</p>
            <p className="text-[11px] text-muted-foreground">{s.desc}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SettingsPage;
