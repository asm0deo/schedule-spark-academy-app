
export type Subject = "Física" | "Química" | "Trigonometría" | "Álgebra";

export type TimeSlot = "08:00 – 09:30" | "10:00 – 11:30";

export interface ClassConfig {
  subject: Subject;
  timeSlot: TimeSlot;
}

export interface DaySchedule {
  classes: ClassConfig[];
}

export interface WeekSchedule {
  lunes: DaySchedule;
  martes: DaySchedule;
  miercoles: DaySchedule;
  jueves: DaySchedule;
  viernes: DaySchedule;
  sabado: DaySchedule;
}

export interface NotificationSettings {
  enabled: boolean;
  minutesBefore: number;
}
