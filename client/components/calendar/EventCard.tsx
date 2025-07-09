import {
  CalendarEvent,
  CALENDAR_COLORS,
  formatEventTime,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
  onClick?: () => void;
  compact?: boolean;
}

export function EventCard({ event, onClick, compact = false }: EventCardProps) {
  const colorClasses = CALENDAR_COLORS[event.color];

  if (compact) {
    return (
      <div
        className={cn(
          "text-xs p-1 rounded-sm border-l-2 cursor-pointer hover:opacity-80 transition-opacity truncate",
          colorClasses,
        )}
        onClick={onClick}
        title={`${event.title} - ${formatEventTime(event.startTime, event.endTime)}`}
      >
        {event.title}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all",
        colorClasses,
      )}
      onClick={onClick}
    >
      <h4 className="font-medium text-sm mb-1 truncate">{event.title}</h4>
      <div className="flex items-center text-xs opacity-90 mb-1">
        <Clock className="h-3 w-3 mr-1" />
        {formatEventTime(event.startTime, event.endTime)}
      </div>
      {event.location && (
        <div className="flex items-center text-xs opacity-90">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{event.location}</span>
        </div>
      )}
    </div>
  );
}
