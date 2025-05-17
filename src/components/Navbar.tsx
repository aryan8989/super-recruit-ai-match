
import { Settings, ChartBar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SettingsModal from "./SettingsModal";
import { useApiKeys } from "@/contexts/ApiKeyContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { isConfigured } = useApiKeys();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="font-bold text-xl">TalentMatch</span>
          </Link>
          
          <div className="hidden md:flex gap-6 text-sm">
            <Link to="/" className="font-medium text-foreground transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {!isConfigured && (
            <span className="text-amber-500 hidden md:block text-sm">
              ⚠️ API key needed
            </span>
          )}
          
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ChartBar className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </nav>
  );
};

export default Navbar;
