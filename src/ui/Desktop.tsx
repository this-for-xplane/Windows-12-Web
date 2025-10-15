import { useState } from "react";
import { Folder, FileText, Chrome, Settings, Calculator, Image } from "lucide-react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Window from "./Window";
import FileExplorer from "./apps/FileExplorer";
import SettingsApp from "./apps/SettingsApp";
import BrowserApp from "./apps/BrowserApp";
import CalculatorApp from "./apps/CalculatorApp";
import WidgetsPanel from "./WidgetsPanel";
import wallpaper from "@/assets/win11-wallpaper.jpg";

export type AppType = {
  id: string;
  title: string;
  icon: any;
  component: any;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
};

const desktopIcons = [
  { id: "folder", name: "Documents", icon: Folder },
  { id: "file", name: "README.txt", icon: FileText },
  { id: "images", name: "Pictures", icon: Image },
];

const Desktop = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppType[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const apps: AppType[] = [
    { id: "explorer", title: "File Explorer", icon: Folder, component: FileExplorer },
    { id: "browser", title: "Browser", icon: Chrome, component: BrowserApp },
    { id: "settings", title: "Settings", icon: Settings, component: SettingsApp },
    { id: "calculator", title: "Calculator", icon: Calculator, component: CalculatorApp },
  ];

  const openApp = (app: AppType) => {
    if (!openWindows.find((w) => w.id === app.id)) {
      const newWindow = {
        ...app,
        position: { x: 100 + openWindows.length * 30, y: 50 + openWindows.length * 30 },
        size: { width: 800, height: 600 },
      };
      setOpenWindows([...openWindows, newWindow]);
      setActiveWindow(app.id);
    } else {
      setActiveWindow(app.id);
    }
    setShowStartMenu(false);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2].id : null);
    }
  };

  const minimizeWindow = (id: string) => {
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative bg-win-desktop"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: "cover", backgroundPosition: "center" }}
      onClick={() => setShowStartMenu(false)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-colors group w-24"
            onDoubleClick={() => {
              const app = apps.find(a => a.id === "explorer");
              if (app) openApp(app);
            }}
          >
            <icon.icon className="w-10 h-10 text-white drop-shadow-lg" />
            <span className="text-xs text-white drop-shadow-lg text-center">{icon.name}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          {...window}
          isActive={activeWindow === window.id}
          onFocus={() => setActiveWindow(window.id)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
        />
      ))}

      {/* Widgets Panel */}
      <WidgetsPanel isOpen={showWidgets} onClose={() => setShowWidgets(false)} />

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu apps={apps} onOpenApp={openApp} onClose={() => setShowStartMenu(false)} />
      )}

      {/* Taskbar */}
      <Taskbar
        apps={apps}
        openWindows={openWindows}
        activeWindow={activeWindow}
        onOpenApp={openApp}
        onToggleStartMenu={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
        }}
        onToggleWidgets={() => setShowWidgets(!showWidgets)}
        onFocusWindow={setActiveWindow}
      />
    </div>
  );
};

export default Desktop;
