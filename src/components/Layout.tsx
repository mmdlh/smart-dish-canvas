import { NavLink, Outlet } from "react-router-dom";
import { Monitor, Thermometer, Zap, Apple, ChefHat, ShieldAlert, BarChart3, Settings } from "lucide-react";
import { motion } from "framer-motion";

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
      `group relative flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-lg transition-all duration-300 flex-1 min-w-0
      ${isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "drop-shadow-[0_0_8px_hsl(185,75%,40%,0.6)]" : "group-hover:scale-110"}`} />
        <span className="text-xs font-medium tracking-wide whitespace-nowrap">{label}</span>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
            style={{ boxShadow: "0 0 8px hsl(185 75% 40% / 0.5)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </>
    )}
  </NavLink>
);

const Layout = () => {
  return (
    <div className="min-h-screen page-bg flex flex-col">
      {/* Header */}
      <header className="header-gradient sticky top-0 z-50">
        <div className="flex items-stretch h-16 px-4 max-w-[1600px] mx-auto">
          {/* Left menus */}
          <nav className="flex items-stretch gap-1 flex-1">
            {leftMenus.map((m) => (
              <MenuButton key={m.path} {...m} />
            ))}
          </nav>

          {/* Center title */}
          <div className="flex items-center justify-center px-6 shrink-0">
            <h1 className="font-display text-xl font-bold tracking-wider text-primary glow-text whitespace-nowrap">
              智慧厨房
            </h1>
          </div>

          {/* Right menus */}
          <nav className="flex items-stretch gap-1 flex-1">
            {rightMenus.map((m) => (
              <MenuButton key={m.path} {...m} />
            ))}
          </nav>
        </div>
        <div className="tech-line" />
      </header>

      {/* Page content */}
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
