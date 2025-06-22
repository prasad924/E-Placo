"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Bell,
  Video,
  Building,
} from "lucide-react";
import ScheduleEventDialog from "@/components/scheduleEvent";

const upcomingEvents = [
  {
    id: 1,
    title: "Google Technical Interview",
    company: "Google",
    type: "Interview",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "2 hours",
    venue: "Conference Room A",
    mode: "Offline",
    participants: 25,
    status: "Confirmed",
    interviewer: "John Doe, Senior Engineer",
    rounds: ["Technical Round 1", "Technical Round 2"],
    students: ["Alice Johnson", "Bob Smith", "Carol Davis"],
  },
  {
    id: 2,
    title: "Microsoft Pre-Placement Talk",
    company: "Microsoft",
    type: "PPT",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "1.5 hours",
    venue: "Main Auditorium",
    mode: "Hybrid",
    participants: 200,
    status: "Confirmed",
    speaker: "Sarah Wilson, HR Director",
    topics: ["Company Overview", "Job Roles", "Application Process"],
  },
  {
    id: 3,
    title: "Amazon Online Assessment",
    company: "Amazon",
    type: "Test",
    date: "2024-01-18",
    time: "9:00 AM",
    duration: "3 hours",
    venue: "Computer Lab 1-3",
    mode: "Online",
    participants: 150,
    status: "Scheduled",
    platform: "HackerRank",
    sections: ["Coding", "MCQs", "Logical Reasoning"],
  },
];

const eventTypes = [
  {
    value: "interview",
    label: "Interview",
    color: "bg-blue-100 text-blue-800",
  },
  { value: "test", label: "Online Test", color: "bg-green-100 text-green-800" },
  {
    value: "ppt",
    label: "Pre-Placement Talk",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "gd",
    label: "Group Discussion",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "presentation",
    label: "Presentation",
    color: "bg-pink-100 text-pink-800",
  },
];

const venues = [
  "Main Auditorium",
  "Conference Room A",
  "Conference Room B",
  "Computer Lab 1",
  "Computer Lab 2",
  "Computer Lab 3",
  "Seminar Hall",
  "Board Room",
  "Virtual/Online",
];

export function ScheduleManagement() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [filterType, setFilterType] = useState("all");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showScheduleEvent, setShowScheduleEvent] = useState(false);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEditDialog(true);
  };

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find((et) => et.value === type.toLowerCase());
    return eventType?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Schedule Management
          </h1>
          <p className="text-muted-foreground">
            Manage interviews, tests, and placement events
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowScheduleEvent(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Event
          </Button>
          {showScheduleEvent && (
            <ScheduleEventDialog onClose={() => setShowScheduleEvent(false)} />
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">
                  Events This Week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">
                  Today&apos;s Events
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">375</div>
                <div className="text-sm text-muted-foreground">
                  Total Participants
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  Active Companies
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-8 w-64" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.time} ({event.duration})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.participants} participants</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {event.company}
                        </span>
                        <span>•</span>
                        <span>{event.mode} Mode</span>
                        {event.interviewer && (
                          <>
                            <span>•</span>
                            <span>{event.interviewer}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline View</CardTitle>
              <CardDescription>
                Chronological view of upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < upcomingEvents.length - 1 && (
                        <div className="w-px h-16 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at{" "}
                          {event.time}
                        </span>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.company} • {event.venue} • {event.participants}{" "}
                        participants
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div>
                  <div>{selectedEvent.title}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {selectedEvent.company}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>
                      {selectedEvent.time} ({selectedEvent.duration})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{selectedEvent.participants} participants</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Event Type</h4>
                    <Badge className={getEventTypeColor(selectedEvent.type)}>
                      {selectedEvent.type}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mode</h4>
                    <span className="text-sm">{selectedEvent.mode}</span>
                  </div>
                </div>
              </div>

              {selectedEvent.rounds && (
                <div>
                  <h4 className="font-medium mb-2">Interview Rounds</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.rounds.map((round) => (
                      <Badge key={round} variant="outline">
                        {round}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.sections && (
                <div>
                  <h4 className="font-medium mb-2">Test Sections</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.sections.map((section) => (
                      <Badge key={section} variant="outline">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.students && (
                <div>
                  <h4 className="font-medium mb-2">Participating Students</h4>
                  <div className="text-sm text-muted-foreground">
                    {selectedEvent.students.join(", ")}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Button>
              <Button>
                <Video className="mr-2 h-4 w-4" />
                Join Meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the details of the selected event
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="logistics">Logistics</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input
                      id="eventTitle"
                      placeholder="Enter event title"
                      defaultValue={editingEvent.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company">
                          {editingEvent.company}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="microsoft">Microsoft</SelectItem>
                        <SelectItem value="amazon">Amazon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type">
                          {editingEvent.type}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode">
                          {editingEvent.mode}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Event description and instructions"
                    rows={3}
                  />
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      defaultValue={editingEvent.date}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <Input
                      id="time"
                      type="time"
                      defaultValue={editingEvent.time}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration">
                          {editingEvent.duration}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hr">1 hour</SelectItem>
                        <SelectItem value="1.5hr">1.5 hours</SelectItem>
                        <SelectItem value="2hr">2 hours</SelectItem>
                        <SelectItem value="3hr">3 hours</SelectItem>
                        <SelectItem value="4hr">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue">
                          {editingEvent.venue}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem
                            key={venue}
                            value={venue.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {venue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="participants" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target Departments</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"].map(
                        (dept) => (
                          <label
                            key={dept}
                            className="flex items-center space-x-2"
                          >
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{dept}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">
                        Maximum Participants
                      </Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="Enter max participants"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eligibility">Eligibility Criteria</Label>
                      <Input id="eligibility" placeholder="e.g., 7.5+ CGPA" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="logistics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coordinator">Event Coordinator</Label>
                    <Input id="coordinator" placeholder="Coordinator name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="Contact number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Required Equipment</Label>
                    <Textarea
                      id="equipment"
                      placeholder="List required equipment"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions"
                      rows={2}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
