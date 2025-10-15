import { Monitor, Wifi, Lock, Bell, Palette, HardDrive, User, ChevronRight } from "lucide-react";

const settingsSections = [
  { icon: Monitor, title: "System", description: "Display, sound, notifications" },
  { icon: Wifi, title: "Network & Internet", description: "Wi-Fi, airplane mode, VPN" },
  { icon: Palette, title: "Personalization", description: "Background, colors, themes" },
  { icon: Bell, title: "Notifications", description: "Alerts and quick actions" },
  { icon: Lock, title: "Privacy & Security", description: "Windows Security, firewall" },
  { icon: User, title: "Accounts", description: "Your accounts, email, sync" },
  { icon: HardDrive, title: "Storage", description: "Disks and storage spaces" },
];

const SettingsApp = () => {
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-secondary/30 border-r border-border/30 p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full px-3 py-2 bg-input border border-border/30 rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl">
          <div className="grid grid-cols-2 gap-4">
            {settingsSections.map((section) => (
              <button
                key={section.title}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all group text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{section.title}</h3>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>

          {/* Quick Settings */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Settings</h2>
            <div className="space-y-3">
              {[
                { label: "Dark Mode", enabled: true },
                { label: "Bluetooth", enabled: false },
                { label: "Focus Assist", enabled: false },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30"
                >
                  <span className="text-sm font-medium text-foreground">{setting.label}</span>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        setting.enabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
