
import React from "react";
import Header from "@/components/Header";
import NotificationSettings from "@/components/NotificationSettings";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  return (
    <ScheduleProvider>
      <div className="container mx-auto max-w-4xl px-4 py-8 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Header title="Configuraciones" showSettings={false} />
        </div>
        
        <div className="space-y-8">
          <NotificationSettings />
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Spark Academy - Versión 1.0.0</p>
          </div>
        </div>
      </div>
    </ScheduleProvider>
  );
};

export default Settings;
