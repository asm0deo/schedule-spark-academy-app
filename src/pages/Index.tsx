
import React, { useState } from "react";
import WeekdayGrid from "@/components/WeekdayGrid";
import Header from "@/components/Header";
import ClassConfigForm from "@/components/ClassConfigForm";
import { ScheduleProvider } from "@/context/ScheduleContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WeekSchedule } from "@/types";
import { DAYS_OF_WEEK_DISPLAY } from "@/utils/constants";

const Index: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<keyof WeekSchedule | null>(null);

  const handleDayClick = (day: keyof WeekSchedule) => {
    setSelectedDay(day);
  };

  const handleCloseDialog = () => {
    setSelectedDay(null);
  };

  return (
    <ScheduleProvider>
      <div className="container mx-auto max-w-4xl px-4 py-8 animate-fade-in">
        <Header title="Spark Academy" />
        
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
      </div>
    </ScheduleProvider>
  );
};

export default Index;
