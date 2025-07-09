import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isToday,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  color: "blue" | "green" | "purple" | "orange" | "red" | "indigo";
  location?: string;
  attendees?: string[];
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export const CALENDAR_COLORS = {
  blue: "bg-blue-500 border-blue-600 text-white",
  green: "bg-green-500 border-green-600 text-white",
  purple: "bg-purple-500 border-purple-600 text-white",
  orange: "bg-orange-500 border-orange-600 text-white",
  red: "bg-red-500 border-red-600 text-white",
  indigo: "bg-indigo-500 border-indigo-600 text-white",
} as const;

export function generateCalendarDays(
  date: Date,
  events: CalendarEvent[],
): CalendarDay[] {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));

  const days: CalendarDay[] = [];
  let currentDate = start;

  while (currentDate <= end) {
    const dayEvents = events.filter((event) =>
      isSameDay(event.startTime, currentDate),
    );

    days.push({
      date: currentDate,
      isCurrentMonth: isSameMonth(currentDate, date),
      isToday: isToday(currentDate),
      events: dayEvents,
    });

    currentDate = addDays(currentDate, 1);
  }

  return days;
}

export function formatEventTime(startTime: Date, endTime: Date): string {
  const start = format(startTime, "h:mm a");
  const end = format(endTime, "h:mm a");
  return `${start} - ${end}`;
}

export function generateEventId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createEvent(
  title: string,
  startTime: Date,
  endTime: Date,
  options: Partial<
    Omit<CalendarEvent, "id" | "title" | "startTime" | "endTime">
  > = {},
): CalendarEvent {
  return {
    id: generateEventId(),
    title,
    startTime,
    endTime,
    color: options.color || "blue",
    description: options.description,
    location: options.location,
    attendees: options.attendees || [],
  };
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
