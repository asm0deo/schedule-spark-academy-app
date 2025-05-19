
import React from "react";
import DayCard from "@/components/DayCard";
import { DAYS_OF_WEEK } from "@/utils/constants";
import { WeekSchedule } from "@/types";

interface WeekdayGridProps {
  onDayClick: (day: keyof WeekSchedule) => void;
}

const WeekdayGrid: React.FC<WeekdayGridProps> = ({ onDayClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {DAYS_OF_WEEK.map((day) => (
        <DayCard
          key={day}
          day={day as keyof WeekSchedule}
          onClick={() => onDayClick(day as keyof WeekSchedule)}
        />
      ))}
    </div>
  );
};

export default WeekdayGrid;
