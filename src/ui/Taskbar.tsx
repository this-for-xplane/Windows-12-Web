import { Clock, Wifi, Volume2, Battery, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { AppType } from "./Desktop";

interface TaskbarProps {
  apps: AppType[];
  openWindows: AppType[];
  activeWindow: string | null;
  onOpenApp: (app: AppType) => void;
  onToggleStartMenu: (e: React.MouseEvent) => void;
  onToggleWidgets: () => void;
  onFocusWindow: (id: string) => void;
}

const Taskbar = ({
  apps,
  openWindows,
  activeWindow,
  onOpenApp,
  onToggleStartMenu,
  onToggleWidgets,
  onFocusWindow,
}: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = apps.slice(0, 4);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-win-taskbar/90 backdrop-blur-glass border-t border-border/50 flex items-center justify-center px-2 z-50">
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <button
          onClick={onToggleStartMenu}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-win-taskbar-hover transition-colors"
        >
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1" />
            <rect x="13" y="3" width="8" height="8" rx="1" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
            <rect x="13" y="13" width="8" height="8" rx="1" />
          </svg>
        </button>

        {/* Search */}
        <button className="h-10 px-3 flex items-center gap-2 rounded-lg hover:bg-win-taskbar-hover transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search</span>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Pinned Apps */}
        {pinnedApps.map((app) => {
          const isOpen = openWindows.find((w) => w.id === app.id);
          const isActive = activeWindow === app.id;
          return (
            <button
              key={app.id}
              onClick={() => isOpen ? onFocusWindow(app.id) : onOpenApp(app)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative ${
                isActive ? "bg-win-taskbar-hover" : "hover:bg-win-taskbar-hover"
              }`}
            >
              <app.icon className="w-5 h-5 text-foreground" />
              {isOpen && (
                <div className={`absolute bottom-0 h-0.5 w-4 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="absolute right-2 flex items-center gap-2">
        {/* Widgets Button */}
        <button
          onClick={onToggleWidgets}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-win-taskbar-hover transition-colors"
        >
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-primary rounded-sm" />
            <div className="w-1.5 h-1.5 bg-primary rounded-sm" />
            <div className="w-1.5 h-1.5 bg-primary rounded-sm" />
            <div className="w-1.5 h-1.5 bg-primary rounded-sm" />
          </div>
        </button>

        {/* System Icons */}
        <div className="flex items-center gap-2 px-2">
          <Wifi className="w-4 h-4 text-foreground" />
          <Volume2 className="w-4 h-4 text-foreground" />
          <Battery className="w-4 h-4 text-foreground" />
        </div>

        {/* Clock */}
        <button className="px-2 py-1 hover:bg-win-taskbar-hover rounded transition-colors">
          <div className="text-xs text-foreground leading-tight">
            <div>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            <div className="text-[10px] text-muted-foreground">
              {time.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
