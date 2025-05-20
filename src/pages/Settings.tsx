
import React from "react";
import Header from "@/components/Header";
import NotificationSettings from "@/components/NotificationSettings";
import { useSchedule } from "@/context/ScheduleContext";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlarmClock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { loadG3Schedule } from "@/utils/presetSchedules";
import { Card } from "@/components/ui/card";

const SettingsContent: React.FC = () => {
  const { updateDaySchedule } = useSchedule();
  
  const handleLoadPreset = () => {
    loadG3Schedule(updateDaySchedule);
    toast({
      title: "Horarios cargados",
      description: "Los horarios del G3 han sido cargados correctamente.",
    });
  };
  
  const sendTestNotification = () => {
    // Esta función enviará una notificación de prueba
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Prope - Clases", {
            body: "Tienes clase de Física a las 08:00 – 09:30",
            icon: "/favicon.ico"
          });
          
          toast({
            title: "Notificación enviada",
            description: "Se ha enviado una notificación de prueba.",
          });
        } else {
          toast({
            title: "Permiso denegado",
            description: "No se pudo enviar la notificación porque el permiso fue denegado.",
            variant: "destructive"
          });
        }
      });
    } else {
      toast({
        title: "Error",
        description: "Tu navegador no soporta notificaciones.",
        variant: "destructive"
      });
    }
  };

  return (
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
        
        <Card className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Horarios Predefinidos</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Carga los horarios predefinidos del G3. Esta acción reemplazará tus horarios actuales.
            </p>
            
            <Button onClick={handleLoadPreset} className="w-full">
              Cargar Horarios G3
            </Button>
          </div>
        </Card>
        
        <Card className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2">
            <AlarmClock className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Notificaciones de Prueba</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Envía una notificación de prueba para verificar que las notificaciones funcionan correctamente.
            </p>
            
            <Button onClick={sendTestNotification} className="w-full">
              Enviar Notificación de Prueba
            </Button>
          </div>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Prope Clases - Versión 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

const Settings: React.FC = () => {
  return (
    <ScheduleProvider>
      <SettingsContent />
    </ScheduleProvider>
  );
};

export default Settings;
