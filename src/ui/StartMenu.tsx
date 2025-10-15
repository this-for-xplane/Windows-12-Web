import { Search, Power } from "lucide-react";
import { AppType } from "./Desktop";

interface StartMenuProps {
  apps: AppType[];
  onOpenApp: (app: AppType) => void;
  onClose: () => void;
}

const StartMenu = ({ apps, onOpenApp, onClose }: StartMenuProps) => {
  return (
    <div
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[640px] h-[720px] bg-win-start-bg/95 backdrop-blur-glass rounded-xl shadow-popup border border-border/50 animate-slide-up overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="p-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for apps, settings, and documents"
            className="w-full h-10 pl-10 pr-4 bg-win-glass border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Pinned</h3>
          <button className="text-xs text-primary hover:underline">All apps →</button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-win-glass transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <app.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-foreground text-center leading-tight">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recommended</h3>
          <button className="text-xs text-primary hover:underline">More →</button>
        </div>
        <div className="space-y-2">
          {apps.slice(0, 3).map((app, idx) => (
            <button
              key={`rec-${app.id}`}
              onClick={() => onOpenApp(app)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-win-glass transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <app.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm text-foreground">{app.title}</div>
                <div className="text-xs text-muted-foreground">{["Just now", "2 min ago", "10 min ago"][idx]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-win-glass/50 backdrop-blur-sm border-t border-border/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">U</span>
          </div>
          <span className="text-sm text-foreground">User</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-win-taskbar-hover transition-colors">
          <Power className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
