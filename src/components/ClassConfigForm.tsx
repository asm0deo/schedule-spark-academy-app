
import React, { useState, useEffect } from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Plus, Save } from "lucide-react";
import { SUBJECTS, TIME_SLOTS, MAX_CLASSES_PER_DAY } from "@/utils/constants";
import { WeekSchedule, ClassConfig } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface ClassConfigFormProps {
  day: keyof WeekSchedule;
  onClose: () => void;
}

const ClassConfigForm: React.FC<ClassConfigFormProps> = ({ day, onClose }) => {
  const { schedule, updateDaySchedule } = useSchedule();
  const [classes, setClasses] = useState<ClassConfig[]>([]);

  // Load existing classes for the selected day on mount
  useEffect(() => {
    setClasses(schedule[day].classes);
  }, [day, schedule]);

  const handleAddClass = () => {
    if (classes.length < MAX_CLASSES_PER_DAY) {
      setClasses([...classes, { subject: "Física", timeSlot: "08:00 – 09:30" }]);
    }
  };

  const handleRemoveClass = (index: number) => {
    const newClasses = [...classes];
    newClasses.splice(index, 1);
    setClasses(newClasses);
  };

  const handleClassChange = (index: number, field: keyof ClassConfig, value: string) => {
    const newClasses = [...classes];
    newClasses[index] = { 
      ...newClasses[index], 
      [field]: value 
    };
    setClasses(newClasses);
  };

  const handleSave = () => {
    // Check for duplicate time slots
    const timeSlots = classes.map(c => c.timeSlot);
    const hasDuplicates = timeSlots.length !== new Set(timeSlots).size;

    if (hasDuplicates) {
      toast({
        title: "Error",
        description: "No puedes programar dos clases en el mismo horario.",
        variant: "destructive"
      });
      return;
    }

    updateDaySchedule(day, { classes });
    toast({
      title: "Éxito",
      description: "Horario actualizado correctamente."
    });
    onClose();
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Configurar Clases</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddClass}
          disabled={classes.length >= MAX_CLASSES_PER_DAY}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Agregar
        </Button>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No hay clases configuradas para este día
        </div>
      ) : (
        <div className="space-y-4">
          {classes.map((classItem, index) => (
            <div key={index} className="glass-card p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Clase {index + 1}</h4>
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveClass(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Materia</label>
                  <Select
                    value={classItem.subject}
                    onValueChange={(value) => handleClassChange(index, "subject", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una materia" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Horario</label>
                  <Select
                    value={classItem.timeSlot}
                    onValueChange={(value) => handleClassChange(index, "timeSlot", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un horario" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((timeSlot) => (
                        <SelectItem key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-1">
          <Save className="h-4 w-4" /> Guardar
        </Button>
      </div>
    </div>
  );
};

export default ClassConfigForm;
