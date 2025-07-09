import { CalendarDay, CalendarEvent, WEEKDAYS } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { EventCard } from "./EventCard";

interface CalendarGridProps {
  days: CalendarDay[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarGrid({
  days,
  onDateClick,
  onEventClick,
}: CalendarGridProps) {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header with weekdays */}
      <div className="grid grid-cols-7 bg-muted">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="p-4 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div
            key={day.date.toISOString()}
            className={cn(
              "min-h-32 p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-accent/50 transition-colors",
              !day.isCurrentMonth && "bg-muted/30",
              day.isToday && "bg-primary/5 border-primary/20",
            )}
            onClick={() => onDateClick(day.date)}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  !day.isCurrentMonth && "text-muted-foreground",
                  day.isToday &&
                    "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs",
                )}
              >
                {format(day.date, "d")}
              </span>
            </div>
            <div className="space-y-1">
              {day.events.slice(0, 3).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  compact
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                />
              ))}
              {day.events.length > 3 && (
                <div className="text-xs text-muted-foreground px-1">
                  +{day.events.length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
