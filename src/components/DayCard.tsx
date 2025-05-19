
import React from "react";
import { Card } from "@/components/ui/card";
import { useSchedule } from "@/context/ScheduleContext";
import { DAYS_OF_WEEK_DISPLAY } from "@/utils/constants";
import { WeekSchedule } from "@/types";

interface DayCardProps {
  day: keyof WeekSchedule;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onClick }) => {
  const { schedule } = useSchedule();
  const daySchedule = schedule[day];
  const classCount = daySchedule.classes.length;

  return (
    <Card
      onClick={onClick}
      className="glass-card cursor-pointer transition-all duration-300 
        hover:bg-white/10 hover:scale-105 active:scale-95 p-6 flex flex-col items-center"
    >
      <h2 className="text-xl font-bold text-gradient mb-2">{DAYS_OF_WEEK_DISPLAY[day]}</h2>
      
      {classCount > 0 ? (
        <div className="mt-2 w-full">
          {daySchedule.classes.map((classItem, index) => (
            <div 
              key={index} 
              className="text-sm bg-purple-500/20 rounded-md px-3 py-1 mb-1 flex justify-between"
            >
              <span>{classItem.subject}</span>
              <span className="text-purple-300">{classItem.timeSlot}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-sm mt-2 animate-pulse-light">
          No hay clases
        </div>
      )}
      
      <div className={`mt-auto pt-3 text-xs ${
        classCount > 0 ? "text-purple-400" : "text-muted-foreground"
      }`}>
        {classCount} {classCount === 1 ? "clase" : "clases"}
      </div>
    </Card>
  );
};

export default DayCard;
