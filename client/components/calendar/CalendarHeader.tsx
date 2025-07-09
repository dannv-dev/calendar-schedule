import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onCreateEvent: () => void;
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onCreateEvent,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-foreground">
          {format(currentDate, "MMMM yyyy")}
        </h1>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={onPreviousMonth}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextMonth}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button onClick={onCreateEvent} className="font-medium">
        <Plus className="h-4 w-4 mr-2" />
        New Event
      </Button>
    </div>
  );
}
