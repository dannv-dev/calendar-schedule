import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarEvent, CALENDAR_COLORS } from "@/lib/calendar-utils";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Trash2, Clock, MapPin } from "lucide-react";

interface EventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

export function EventModal({
  open,
  onOpenChange,
  event,
  selectedDate,
  onSave,
  onDelete,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState<keyof typeof CALENDAR_COLORS>("blue");

  const isEditing = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      setLocation(event.location || "");
      setStartTime(format(event.startTime, "HH:mm"));
      setEndTime(format(event.endTime, "HH:mm"));
      setColor(event.color);
    } else if (selectedDate) {
      setTitle("");
      setDescription("");
      setLocation("");
      setStartTime("09:00");
      setEndTime("10:00");
      setColor("blue");
    }
  }, [event, selectedDate]);

  const handleSave = () => {
    if (!title.trim()) return;

    const baseDate = event?.startTime || selectedDate || new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDateTime = new Date(baseDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(baseDate);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    const newEvent: CalendarEvent = {
      id: event?.id || Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim() || undefined,
      location: location.trim() || undefined,
      startTime: startDateTime,
      endTime: endDateTime,
      color,
      attendees: event?.attendees || [],
    };

    onSave(newEvent);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="pl-10 mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select
              value={color}
              onValueChange={(value) =>
                setColor(value as keyof typeof CALENDAR_COLORS)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CALENDAR_COLORS).map(
                  ([colorKey, colorClass]) => (
                    <SelectItem key={colorKey} value={colorKey}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${colorClass}`} />
                        <span className="capitalize">{colorKey}</span>
                      </div>
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {isEditing && onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {isEditing ? "Update" : "Create"} Event
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
