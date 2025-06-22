"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Filter, MapPin, Search, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Technical Interview",
    company: "TechCorp",
    logo: "/placeholder.svg",
    date: "2025-05-05",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "interview",
    round: "Round 1",
    location: "Online (Zoom)",
    meetingLink: "https://zoom.us/j/example",
    notes: "Prepare for questions on data structures and algorithms",
  },
  {
    id: 2,
    title: "HR Interview",
    company: "CloudTech",
    logo: "/placeholder.svg",
    date: "2025-05-05",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    type: "interview",
    round: "Final Round",
    location: "Online (Google Meet)",
    meetingLink: "https://meet.google.com/example",
    notes: "Review company values and prepare questions about the role",
  },
  {
    id: 3,
    title: "Pre-placement Talk",
    company: "FutureTech",
    logo: "/placeholder.svg",
    date: "2025-05-07",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    type: "presentation",
    location: "Auditorium A",
    notes: "Learn about company culture and job opportunities",
  },
  {
    id: 4,
    title: "Aptitude Test",
    company: "GlobalSoft",
    logo: "/placeholder.svg",
    date: "2025-05-09",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    type: "test",
    location: "Computer Lab 3",
    notes: "Bring your ID card and be on time",
  },
  {
    id: 5,
    title: "Group Discussion",
    company: "InnovateTech",
    logo: "/placeholder.svg",
    date: "2025-05-12",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    type: "group-discussion",
    location: "Conference Hall B",
    notes: "Topic will be revealed on the spot",
  },
  {
    id: 6,
    title: "Coding Test",
    company: "DataSystems",
    logo: "/placeholder.svg",
    date: "2025-05-15",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    type: "test",
    location: "Online (HackerRank)",
    meetingLink: "https://hackerrank.com/test/example",
    notes: "Focus on problem-solving and efficiency",
  },
  {
    id: 7,
    title: "System Design Interview",
    company: "TechCorp",
    logo: "/placeholder.svg",
    date: "2025-05-18",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    type: "interview",
    round: "Round 2",
    location: "Online (Zoom)",
    meetingLink: "https://zoom.us/j/example2",
    notes: "Prepare to discuss scalable system architecture",
  },
]

export function InterviewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 5))
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState(["interview", "test", "presentation", "group-discussion"])

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date(2025, 4, 5)
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const firstDayOfWeek = firstDay.getDay()

    const daysInMonth = lastDay.getDate()

    const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const days = []

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i)
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
      })
    }

    return days
  }

  const getEventsForDate = (date) => {
    const dateString = formatDateToYYYYMMDD(date)
    return MOCK_EVENTS.filter((event) => {
      const matchesFilter = filterType.includes(event.type)
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.company.toLowerCase().includes(searchQuery.toLowerCase())
      return event.date === dateString && matchesFilter && matchesSearch
    })
  }

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isSameDate = (date1, date2) => {
    if (!date2) return false
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "interview":
        return "bg-blue-500/10 text-blue-500"
      case "test":
        return "bg-purple-500/10 text-purple-500"
      case "presentation":
        return "bg-orange-500/10 text-orange-500"
      case "group-discussion":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const formatEventType = (type) => {
    switch (type) {
      case "interview":
        return "Interview"
      case "test":
        return "Test"
      case "presentation":
        return "Presentation"
      case "group-discussion":
        return "Group Discussion"
      default:
        return type
    }
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Interview Calendar</h2>
          <p className="text-muted-foreground">View and manage your upcoming interviews and placement events.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle>{formatMonth(currentDate)}</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Event Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filterType.includes("interview")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterType([...filterType, "interview"])
                        } else {
                          setFilterType(filterType.filter((type) => type !== "interview"))
                        }
                      }}
                    >
                      Interviews
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterType.includes("test")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterType([...filterType, "test"])
                        } else {
                          setFilterType(filterType.filter((type) => type !== "test"))
                        }
                      }}
                    >
                      Tests
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterType.includes("presentation")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterType([...filterType, "presentation"])
                        } else {
                          setFilterType(filterType.filter((type) => type !== "presentation"))
                        }
                      }}
                    >
                      Presentations
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterType.includes("group-discussion")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterType([...filterType, "group-discussion"])
                        } else {
                          setFilterType(filterType.filter((type) => type !== "group-discussion"))
                        }
                      }}
                    >
                      Group Discussions
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b">
              <div className="py-2 text-center text-sm font-medium">Mon</div>
              <div className="py-2 text-center text-sm font-medium">Tue</div>
              <div className="py-2 text-center text-sm font-medium">Wed</div>
              <div className="py-2 text-center text-sm font-medium">Thu</div>
              <div className="py-2 text-center text-sm font-medium">Fri</div>
              <div className="py-2 text-center text-sm font-medium">Sat</div>
              <div className="py-2 text-center text-sm font-medium">Sun</div>
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    min-h-[100px] border p-1 transition-colors
                    ${day.isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground"}
                    ${isSameDate(day.date, selectedDate) ? "ring-2 ring-primary ring-inset" : ""}
                  `}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="flex justify-between p-1">
                    <span className="text-sm">{day.date.getDate()}</span>
                    {day.events.length > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {day.events.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    {day.events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`
                          truncate rounded px-1 py-0.5 text-xs
                          ${getTypeBadgeColor(event.type)}
                        `}
                      >
                        {event.startTime} - {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="truncate rounded bg-secondary/50 px-1 py-0.5 text-xs">
                        + {day.events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a date"}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length === 0
                ? "No events scheduled for this day"
                : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              {selectedDateEvents.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <Clock className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No events scheduled</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no events scheduled for this date. Click the button below to add a new event.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="space-y-3 rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={event.logo || "/placeholder.svg"} alt={event.company} />
                          <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="font-medium leading-none">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.company}</p>
                        </div>
                        <Badge className={`ml-auto ${getTypeBadgeColor(event.type)}`}>
                          {formatEventType(event.type)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                          {event.round && (
                            <Badge variant="outline" className="ml-2">
                              {event.round}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        {event.meetingLink && (
                          <div className="flex items-center text-sm">
                            <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Button variant="link" className="h-auto p-0 text-sm" asChild>
                              <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
                                Join Meeting <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        )}
                        {event.notes && (
                          <div className="mt-2 text-sm">
                            <Label className="mb-1 block">Notes:</Label>
                            <p className="text-muted-foreground">{event.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Overview of your upcoming interviews and events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-4">
                {MOCK_EVENTS.filter((event) => new Date(event.date) >= new Date(2025, 4, 5))
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={event.logo || "/placeholder.svg"} alt={event.company} />
                          <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span>{event.company}</span>
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span>{event.startTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeBadgeColor(event.type)}>{formatEventType(event.type)}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              <div className="space-y-4">
                {MOCK_EVENTS.filter((event) => new Date(event.date) < new Date(2025, 4, 5))
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={event.logo || "/placeholder.svg"} alt={event.company} />
                          <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span>{event.company}</span>
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span>{event.startTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeBadgeColor(event.type)}>{formatEventType(event.type)}</Badge>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {MOCK_EVENTS.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                  <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={event.logo || "/placeholder.svg"} alt={event.company} />
                        <AvatarFallback>{event.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>{event.company}</span>
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>{event.startTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeBadgeColor(event.type)}>{formatEventType(event.type)}</Badge>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
