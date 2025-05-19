
import React, { createContext, useState, useContext, useEffect } from "react";
import { WeekSchedule, DaySchedule, ClassConfig, NotificationSettings } from "@/types";
import { DAYS_OF_WEEK } from "@/utils/constants";

interface ScheduleContextType {
  schedule: WeekSchedule;
  updateDaySchedule: (day: keyof WeekSchedule, daySchedule: DaySchedule) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: NotificationSettings) => void;
}

const defaultSchedule: WeekSchedule = {
  lunes: { classes: [] },
  martes: { classes: [] },
  miercoles: { classes: [] },
  jueves: { classes: [] },
  viernes: { classes: [] },
  sabado: { classes: [] },
};

const defaultNotificationSettings: NotificationSettings = {
  enabled: true,
  minutesBefore: 15,
};

const ScheduleContext = createContext<ScheduleContextType>({
  schedule: defaultSchedule,
  updateDaySchedule: () => {},
  notificationSettings: defaultNotificationSettings,
  updateNotificationSettings: () => {},
});

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    defaultNotificationSettings
  );
  
  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedSchedule = localStorage.getItem("schedule");
      const savedSettings = localStorage.getItem("notificationSettings");
      
      if (savedSchedule) {
        setSchedule(JSON.parse(savedSchedule));
      }
      
      if (savedSettings) {
        setNotificationSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("schedule", JSON.stringify(schedule));
    } catch (error) {
      console.error("Error saving schedule to localStorage:", error);
    }
  }, [schedule]);
  
  useEffect(() => {
    try {
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
    } catch (error) {
      console.error("Error saving notification settings to localStorage:", error);
    }
  }, [notificationSettings]);
  
  const updateDaySchedule = (day: keyof WeekSchedule, daySchedule: DaySchedule) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: daySchedule,
    }));
  };
  
  const updateNotificationSettings = (settings: NotificationSettings) => {
    setNotificationSettings(settings);
  };
  
  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        updateDaySchedule,
        notificationSettings,
        updateNotificationSettings,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
