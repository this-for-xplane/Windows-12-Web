import { Home, Star, Clock, Search, RefreshCw, Lock } from "lucide-react";

const quickLinks = [
  { name: "YouTube", url: "youtube.com", color: "bg-red-500" },
  { name: "GitHub", url: "github.com", color: "bg-gray-700" },
  { name: "Twitter", url: "twitter.com", color: "bg-blue-400" },
  { name: "Gmail", url: "gmail.com", color: "bg-red-600" },
];

const BrowserApp = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Tab Bar */}
      <div className="h-10 bg-secondary/30 border-b border-border/30 flex items-center px-2 gap-2">
        <div className="flex-1 flex items-center gap-1">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background/50 rounded-t border-t-2 border-primary">
            <Lock className="w-3 h-3 text-primary" />
            <span className="text-xs text-foreground">New Tab</span>
          </div>
          <button className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground">+</button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="h-12 bg-secondary/20 border-b border-border/30 flex items-center px-4 gap-2">
        <button className="p-1.5 rounded hover:bg-win-glass transition-colors">
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 rounded hover:bg-win-glass transition-colors">
          <Home className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-input rounded-full border border-border/30">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search or enter web address"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button className="p-1.5 rounded hover:bg-win-glass transition-colors">
          <Star className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-background/80 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">New Tab</h1>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 rounded-full border border-border/30">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search the web"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Quick Links</h2>
            <div className="grid grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary/30 transition-colors group"
                >
                  <div className={`w-16 h-16 ${link.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {link.name[0]}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{link.name}</div>
                    <div className="text-xs text-muted-foreground">{link.url}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent
            </h2>
            <div className="space-y-2">
              {["Documentation - MDN", "Stack Overflow - Question", "GitHub - Repository"].map((item) => (
                <button
                  key={item}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserApp;
