import { Folder, File, Image, Music, Video, ChevronRight, Home, Star } from "lucide-react";

const folders = [
  { name: "Documents", icon: Folder, items: 24 },
  { name: "Downloads", icon: Folder, items: 15 },
  { name: "Pictures", icon: Image, items: 142 },
  { name: "Music", icon: Music, items: 87 },
  { name: "Videos", icon: Video, items: 12 },
];

const files = [
  { name: "Project Report.docx", type: "Document", size: "2.4 MB", modified: "Today" },
  { name: "Presentation.pptx", type: "Presentation", size: "5.1 MB", modified: "Yesterday" },
  { name: "Budget.xlsx", type: "Spreadsheet", size: "890 KB", modified: "2 days ago" },
];

const FileExplorer = () => {
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-secondary/30 border-r border-border/30 p-3">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-win-glass transition-colors">
            <Home className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Home</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-win-glass transition-colors">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Favorites</span>
          </button>
          <div className="pt-4 pb-2 px-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase">This PC</span>
          </div>
          {folders.map((folder) => (
            <button
              key={folder.name}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-win-glass transition-colors"
            >
              <folder.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{folder.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Address Bar */}
        <div className="h-12 bg-secondary/20 border-b border-border/30 flex items-center px-4 gap-2">
          <button className="p-1 rounded hover:bg-win-glass transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground rotate-180" />
          </button>
          <button className="p-1 rounded hover:bg-win-glass transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 flex items-center gap-1 px-3 py-1.5 bg-input rounded text-sm text-foreground">
            <Home className="w-3 h-3 text-primary" />
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span>Documents</span>
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Folders</h3>
            <div className="grid grid-cols-4 gap-4">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-win-glass border border-transparent hover:border-border/30 transition-all group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <folder.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-foreground">{folder.name}</div>
                    <div className="text-xs text-muted-foreground">{folder.items} items</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Files</h3>
            <div className="space-y-1">
              {files.map((file) => (
                <button
                  key={file.name}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-win-glass transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <File className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.type}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{file.size}</div>
                  <div className="text-xs text-muted-foreground w-20 text-right">{file.modified}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
