
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { loadG3Schedule } from "@/utils/presetSchedules";
import { WeekSchedule } from "@/types";
import { toast } from "@/hooks/use-toast";

interface SchedulePresetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updateDaySchedule: (day: keyof WeekSchedule, daySchedule: { classes: any[] }) => void;
}

const SchedulePresetDialog: React.FC<SchedulePresetDialogProps> = ({
  open,
  onOpenChange,
  updateDaySchedule,
}) => {
  const handleConfirm = () => {
    loadG3Schedule(updateDaySchedule);
    toast({
      title: "Horarios cargados",
      description: "Los horarios del G3 han sido cargados correctamente.",
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-card border-white/10 bg-purple-800/90 backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cargar horarios del G3?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/80">
            Esto reemplazará tus horarios actuales con los horarios predefinidos del G3.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SchedulePresetDialog;
