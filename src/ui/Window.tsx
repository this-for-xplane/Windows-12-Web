import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";
import { AppType } from "./Desktop";

interface WindowProps extends AppType {
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
}

const Window = ({ title, icon: Icon, component: Component, position, size, isActive, onFocus, onClose, onMinimize }: WindowProps) => {
  const [pos, setPos] = useState(position || { x: 100, y: 50 });
  const [windowSize, setWindowSize] = useState(size || { width: 800, height: 600 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current || isMaximized) return;
      
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      
      setPos({
        x: dragRef.current.startPosX + deltaX,
        y: Math.max(0, dragRef.current.startPosY + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100% - 48px)" }
    : { top: pos.y, left: pos.x, width: windowSize.width, height: windowSize.height };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-card/95 backdrop-blur-glass rounded-xl shadow-window border transition-all ${
        isActive ? "border-primary/50 z-40" : "border-border/50 z-30"
      }`}
      style={windowStyle}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-win-glass/50 backdrop-blur-sm rounded-t-xl flex items-center justify-between px-4 cursor-move border-b border-border/30"
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-win-taskbar-hover transition-colors"
          >
            <Minus className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={toggleMaximize}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-win-taskbar-hover transition-colors"
          >
            <Square className="w-3 h-3 text-foreground" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-destructive transition-colors group"
          >
            <X className="w-4 h-4 text-foreground group-hover:text-destructive-foreground" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] overflow-auto bg-background/50 rounded-b-xl">
        <Component />
      </div>
    </div>
  );
};

export default Window;
