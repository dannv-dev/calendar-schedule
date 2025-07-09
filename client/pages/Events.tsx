import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                <CalendarIcon className="w-6 h-6 text-primary-foreground" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Events</h1>
                <p className="text-sm text-muted-foreground">
                  Manage all your events
                </p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Calendar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Event Management Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                This page will feature advanced event management capabilities
                including recurring events, invitations, and detailed event
                analytics.
              </p>
              <Link to="/">
                <Button>Return to Calendar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
