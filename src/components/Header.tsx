
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  showSettings?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showSettings = true }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient">{title}</h1>
      </div>
      {showSettings && (
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
