# Modern Calendar & Scheduling Application

A beautiful, production-ready calendar and scheduling tool built with React, TypeScript, and Tailwind CSS.

## Features

### ✨ Modern Design

- Clean, contemporary interface with fresh color palette
- Dark/light theme support with smooth transitions
- Responsive design that works on desktop, tablet, and mobile
- Smooth animations and hover effects

### 📅 Calendar Functionality

- Monthly calendar grid view
- Visual day indicators for today and current month
- Easy navigation between months
- Click any date to create new events

### 🎯 Event Management

- Create, edit, and delete events
- Color-coded events (6 different colors)
- Time-based scheduling with start/end times
- Event descriptions and location support
- Visual event cards on calendar grid

### 🎨 User Experience

- Intuitive event creation modal
- Quick event previews on hover
- Visual indicators for days with events
- Responsive grid that adapts to screen size
- Clean typography and spacing

## Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Date Handling**: date-fns for robust date operations
- **State Management**: React hooks (useState, useEffect)
- **Theme**: next-themes for dark/light mode
- **Routing**: React Router 6 for SPA navigation
- **Icons**: Lucide React for consistent iconography

## Component Architecture

```
client/
├── components/
│   ├── calendar/
│   │   ├── CalendarGrid.tsx      # Main calendar display
│   │   ├── CalendarHeader.tsx    # Month navigation
│   │   ├── EventCard.tsx         # Event display component
│   │   └── EventModal.tsx        # Event creation/editing
│   ├── providers/
│   │   └── ThemeProvider.tsx     # Theme context
│   └── ui/                       # Reusable UI components
├── lib/
│   └── calendar-utils.ts         # Calendar logic & utilities
└── pages/
    ├── Index.tsx                 # Main calendar page
    └── Events.tsx                # Events management (placeholder)
```

## Usage

### Creating Events

1. Click the "New Event" button or click on any date
2. Fill in event details (title, time, location, etc.)
3. Choose a color for visual organization
4. Save to add to your calendar

### Managing Events

- Click on any event to edit or delete it
- Events are color-coded for easy visual organization
- Up to 3 events display per day, with "+ more" indicator

### Navigation

- Use arrow buttons to navigate between months
- Click on any date to create events for that day
- Toggle between light and dark themes with the theme button

## Color System

The application uses a modern color palette:

- **Primary**: Purple/violet for main actions and highlights
- **Background**: Clean whites/dark grays for optimal readability
- **Event Colors**: 6 distinct colors (blue, green, purple, orange, red, indigo)
- **Semantic Colors**: Proper contrast ratios for accessibility

## Future Enhancements

- Recurring events
- Event reminders and notifications
- Calendar sharing and collaboration
- Import/export functionality (iCal, Google Calendar)
- Week and day views
- Advanced event filtering and search
- Time zone support
