
import { Subject, TimeSlot } from "@/types";

export const DAYS_OF_WEEK = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
] as const;

export const DAYS_OF_WEEK_DISPLAY = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
} as const;

export const SUBJECTS: Subject[] = [
  "Física",
  "Química",
  "Trigonometría", 
  "Álgebra"
];

export const TIME_SLOTS: TimeSlot[] = [
  "08:00 – 09:30",
  "10:00 – 11:30"
];

export const SUBJECT_ICONS = {
  "Física": "atom",
  "Química": "flask",
  "Trigonometría": "calculator",
  "Álgebra": "function"
};

export const DEFAULT_NOTIFICATION_MINUTES = 15;

export const MAX_CLASSES_PER_DAY = 2;
