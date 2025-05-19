
import React, { useState } from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Bell } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings: React.FC = () => {
  const { notificationSettings, updateNotificationSettings } = useSchedule();
  
  const [enabled, setEnabled] = useState(notificationSettings.enabled);
  const [minutesBefore, setMinutesBefore] = useState(notificationSettings.minutesBefore);
  
  const handleSave = () => {
    updateNotificationSettings({
      enabled,
      minutesBefore,
    });
    
    toast({
      title: "Configuración guardada",
      description: "La configuración de notificaciones ha sido actualizada.",
    });
  };
  
  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-purple-400" />
          <h3 className="font-medium">Notificaciones</h3>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={setEnabled} 
          className="data-[state=checked]:bg-purple-500"
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="notification-time">Tiempo de anticipación</Label>
            <span className="text-sm text-purple-400">{minutesBefore} minutos</span>
          </div>
          <Slider
            id="notification-time"
            min={5}
            max={30}
            step={5}
            defaultValue={[minutesBefore]}
            onValueChange={(values) => setMinutesBefore(values[0])}
            disabled={!enabled}
            className="data-[disabled]:opacity-50"
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Recibirás notificaciones {minutesBefore} minutos antes de que comience cada clase.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" /> Guardar
        </Button>
      </div>
    </Card>
  );
};

export default NotificationSettings;
