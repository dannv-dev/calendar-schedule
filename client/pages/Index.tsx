import { useState, useEffect } from "react";
import { addMonths, subMonths, startOfMonth } from "date-fns";
import {
  CalendarEvent,
  generateCalendarDays,
  createEvent,
} from "@/lib/calendar-utils";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventModal } from "@/components/calendar/EventModal";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Index() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { theme, setTheme } = useTheme();

  // Initialize with some sample events
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sampleEvents: CalendarEvent[] = [
      createEvent(
        "Team Meeting",
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        {
          description: "Weekly team sync and project updates",
          location: "Conference Room A",
          color: "blue",
        },
      ),
      createEvent(
        "Client Presentation",
        new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          15,
          30,
        ),
        {
          description: "Quarterly business review presentation",
          location: "Client Office",
          color: "purple",
        },
      ),
      createEvent(
        "Lunch with Sarah",
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          12,
          30,
        ),
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          13,
          30,
        ),
        {
          description: "Catch up and discuss new project ideas",
          location: "Downtown Café",
          color: "green",
        },
      ),
    ];

    setEvents(sampleEvents);
  }, []);

  const calendarDays = generateCalendarDays(currentDate, events);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleCreateEvent = () => {
    setSelectedEvent(undefined);
    setSelectedDate(startOfMonth(currentDate));
    setShowEventModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setShowEventModal(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    } else {
      // Create new event
      setEvents((prev) => [...prev, event]);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <CalendarIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Calendar</h1>
                <p className="text-sm text-muted-foreground">
                  Organize your schedule
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" onClick={handleCreateEvent}>
                New Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onCreateEvent={handleCreateEvent}
        />

        <CalendarGrid
          days={calendarDays}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </main>

      {/* Event Modal */}
      <EventModal
        open={showEventModal}
        onOpenChange={setShowEventModal}
        event={selectedEvent}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}
