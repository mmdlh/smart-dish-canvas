import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Monitor, Thermometer, Zap, Apple, ChefHat, ShieldAlert, BarChart3, Settings, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const leftMenus = [
  { path: "/", label: "设备监控", icon: Monitor },
  { path: "/environment", label: "环境检测", icon: Thermometer },
  { path: "/energy", label: "能耗管理", icon: Zap },
  { path: "/ingredients", label: "食材管理", icon: Apple },
];

const rightMenus = [
  { path: "/recipes", label: "菜谱中心", icon: ChefHat },
  { path: "/safety", label: "安全预警", icon: ShieldAlert },
  { path: "/analytics", label: "数据分析", icon: BarChart3 },
  { path: "/settings", label: "系统设置", icon: Settings },
];

const MenuButton = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
  <NavLink
    to={path}
    end={path === "/"}
    className={({ isActive }) =>
      `group relative flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 flex-1 min-w-0
      ${isActive
        ? "bg-gradient-to-b from-primary/15 to-primary/5 text-primary shadow-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div className={`relative ${isActive ? "animate-float" : ""}`}>
          <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "drop-shadow-[0_0_10px_hsl(185,75%,40%,0.7)]" : "group-hover:scale-110"}`} />
          {isActive && (
            <div className="absolute -inset-1.5 rounded-full bg-primary/10 animate-breathe" />
          )}
        </div>
        <span className={`text-[11px] font-medium tracking-wide whitespace-nowrap ${isActive ? "font-semibold" : ""}`}>{label}</span>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-0.5 left-3 right-3 h-[2.5px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(185 75% 40%), transparent)", boxShadow: "0 0 12px hsl(185 75% 40% / 0.6)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </>
    )}
  </NavLink>
);

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-display text-xs text-muted-foreground tracking-wider tabular-nums">
      {time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen page-bg flex flex-col">
      {/* Header */}
      <header className="header-gradient sticky top-0 z-50">
        {/* Top info bar */}
        <div className="flex items-center justify-between px-6 py-1.5 border-b border-border/30">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-kitchen-green" />系统运行正常</span>
            <span>·</span>
            <span>在线设备 21/24</span>
          </div>
          <div className="flex items-center gap-3">
            <LiveClock />
            <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "short" })}</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="flex items-stretch h-[68px] px-4 max-w-[1600px] mx-auto">
          <nav className="flex items-stretch gap-1 flex-1">
            {leftMenus.map((m) => <MenuButton key={m.path} {...m} />)}
          </nav>

          <div className="flex flex-col items-center justify-center px-8 shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-primary/5 to-transparent" />
            </div>
            <h1 className="font-display text-xl font-bold tracking-[0.2em] text-primary glow-text whitespace-nowrap relative">
              智慧厨房
            </h1>
            <span className="text-[10px] text-muted-foreground tracking-[0.3em] relative">SMART KITCHEN</span>
          </div>

          <nav className="flex items-stretch gap-1 flex-1">
            {rightMenus.map((m) => <MenuButton key={m.path} {...m} />)}
          </nav>
        </div>
        <div className="tech-line" />
      </header>

      {/* Page content with transition */}
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-3 text-center">
        <p className="text-xs text-muted-foreground">智慧厨房管理平台 v2.6 © 2026 · 运行环境稳定 · 数据更新于 {new Date().toLocaleTimeString("zh-CN")}</p>
      </footer>
    </div>
  );
};

export default Layout;
