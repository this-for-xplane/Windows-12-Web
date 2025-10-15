import { Cloud, Sun, TrendingUp, Calendar } from "lucide-react";

interface WidgetsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const WidgetsPanel = ({ isOpen, onClose }: WidgetsPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 bottom-12 w-[480px] bg-win-start-bg/95 backdrop-blur-glass border-l border-border/50 shadow-popup z-50 animate-slide-in-right overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Widgets</h2>
            <button onClick={onClose} className="text-sm text-primary hover:underline">Close</button>
          </div>

          {/* Weather Widget */}
          <div className="bg-win-glass/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-foreground">72°F</div>
                <div className="text-sm text-muted-foreground">Partly Cloudy</div>
                <div className="text-xs text-muted-foreground mt-1">San Francisco, CA</div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                <div key={day} className="flex-1 text-center">
                  <div className="text-xs text-muted-foreground">{day}</div>
                  <Cloud className="w-4 h-4 text-muted-foreground mx-auto my-1" />
                  <div className="text-xs text-foreground">{70 + i}°</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-win-glass/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Calendar</h3>
            </div>
            <div className="space-y-2">
              {[
                { title: "Team Meeting", time: "2:00 PM" },
                { title: "Project Review", time: "4:30 PM" },
              ].map((event) => (
                <div key={event.title} className="flex items-center justify-between p-2 rounded hover:bg-win-glass/30 transition-colors">
                  <span className="text-sm text-foreground">{event.title}</span>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Widget */}
          <div className="bg-win-glass/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Stocks</h3>
            </div>
            <div className="space-y-2">
              {[
                { symbol: "MSFT", price: "$420.50", change: "+2.3%" },
                { symbol: "AAPL", price: "$178.25", change: "+1.8%" },
                { symbol: "GOOGL", price: "$142.80", change: "-0.5%" },
              ].map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-2 rounded hover:bg-win-glass/30 transition-colors">
                  <span className="text-sm font-medium text-foreground">{stock.symbol}</span>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{stock.price}</div>
                    <div className={`text-xs ${stock.change.startsWith("+") ? "text-green-500" : "text-destructive"}`}>
                      {stock.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetsPanel;
