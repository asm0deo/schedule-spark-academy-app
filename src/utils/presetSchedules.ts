
import { ClassConfig, WeekSchedule } from "@/types";

export const G3_SCHEDULE: WeekSchedule = {
  lunes: {
    classes: [
      { subject: "Álgebra", timeSlot: "08:00 – 09:30" },
      { subject: "Física", timeSlot: "10:00 – 11:30" }
    ]
  },
  martes: {
    classes: [
      { subject: "Trigonometría", timeSlot: "08:00 – 09:30" },
      { subject: "Química", timeSlot: "10:00 – 11:30" }
    ]
  },
  miercoles: {
    classes: [
      { subject: "Álgebra", timeSlot: "08:00 – 09:30" },
      { subject: "Física", timeSlot: "10:00 – 11:30" }
    ]
  },
  jueves: {
    classes: [
      { subject: "Trigonometría", timeSlot: "08:00 – 09:30" },
      { subject: "Química", timeSlot: "10:00 – 11:30" }
    ]
  },
  viernes: {
    classes: [
      { subject: "Álgebra", timeSlot: "08:00 – 09:30" },
      { subject: "Química", timeSlot: "10:00 – 11:30" }
    ]
  },
  sabado: {
    classes: [
      { subject: "Trigonometría", timeSlot: "08:00 – 09:30" },
      { subject: "Física", timeSlot: "10:00 – 11:30" }
    ]
  }
};

export const loadG3Schedule = (updateDaySchedule: (day: keyof WeekSchedule, classes: { classes: ClassConfig[] }) => void) => {
  Object.entries(G3_SCHEDULE).forEach(([day, schedule]) => {
    updateDaySchedule(day as keyof WeekSchedule, schedule);
  });
};
