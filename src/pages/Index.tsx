
import React, { useState, useEffect } from "react";
import WeekdayGrid from "@/components/WeekdayGrid";
import Header from "@/components/Header";
import ClassConfigForm from "@/components/ClassConfigForm";
import { ScheduleProvider, useSchedule } from "@/context/ScheduleContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WeekSchedule } from "@/types";
import { DAYS_OF_WEEK_DISPLAY } from "@/utils/constants";
import SchedulePresetDialog from "@/components/SchedulePresetDialog";

const IndexContent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<keyof WeekSchedule | null>(null);
  const [showPresetDialog, setShowPresetDialog] = useState(false);
  const { schedule, updateDaySchedule } = useSchedule();

  useEffect(() => {
    // Comprobar si hay horarios configurados
    const hasConfiguredSchedules = Object.values(schedule).some(
      (day) => day.classes && day.classes.length > 0
    );
    
    if (!hasConfiguredSchedules) {
      // Si no hay horarios configurados, mostrar el diálogo
      setShowPresetDialog(true);
    }
  }, [schedule]);

  const handleDayClick = (day: keyof WeekSchedule) => {
    setSelectedDay(day);
  };

  const handleCloseDialog = () => {
    setSelectedDay(null);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 animate-fade-in">
      <Header title="Prope Clases" />
      
      <div className="mb-8">
        <h2 className="text-lg text-muted-foreground mb-6">
          Selecciona un día para configurar tus clases
        </h2>
        <WeekdayGrid onDayClick={handleDayClick} />
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="glass-card border-white/10 bg-purple-800/90 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDay ? DAYS_OF_WEEK_DISPLAY[selectedDay] : ""}
            </DialogTitle>
          </DialogHeader>
          {selectedDay && (
            <ClassConfigForm day={selectedDay} onClose={handleCloseDialog} />
          )}
        </DialogContent>
      </Dialog>

      <SchedulePresetDialog 
        open={showPresetDialog} 
        onOpenChange={setShowPresetDialog} 
        updateDaySchedule={updateDaySchedule} 
      />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ScheduleProvider>
      <IndexContent />
    </ScheduleProvider>
  );
};

export default Index;
