"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  Calendar,
  CheckSquare,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
// import { NotificationPopover } from "@/components/ui/notification-popover"
import { useAuth } from "@/context/AuthContext"

export function RecruiterLayout({ children }) {
  const router = useRouter()
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex bg-background w-dvw">
        <Sidebar className="hidden md:flex border-r">
          <SidebarHeader className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <h1 className="text-xl font-bold">E-Placo</h1>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary/50">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.url? user.url : 'default.png'} alt="Avatar" />
                <AvatarFallback>$</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
                {/* <span className="text-xs text-muted-foreground">{user.company}</span> */}
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/recruiter/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/recruiter/candidates">
                        <Users className="h-4 w-4" />
                        <span>Candidate Profiles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/recruiter/shortlisting">
                        <CheckSquare className="h-4 w-4" />
                        <span>Shortlisting Panel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/recruiter/interviews">
                        <Calendar className="h-4 w-4" />
                        <span>Interview Schedule</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/recruiter/feedback">
                        <MessageSquare className="h-4 w-4" />
                        <span>Feedback Module</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/recruiter/job-details">
                        <FileText className="h-4 w-4" />
                        <span>Job Details</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 sm:max-w-xs">
                <div className="flex h-full flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    <h1 className="text-xl font-bold">E-Placo</h1>
                  </div>
                  <div className="mt-4 space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/candidates">
                        <Users className="mr-2 h-4 w-4" />
                        Candidate Profiles
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/shortlisting">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Shortlisting Panel
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/interviews">
                        <Calendar className="mr-2 h-4 w-4" />
                        Interview Schedule
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/feedback">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Feedback Module
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/recruiter/job-details">
                        <FileText className="mr-2 h-4 w-4" />
                        Job Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <h1 className="text-xl font-bold">E-Placo Recruiter</h1>
              </div>
              <div className="flex items-center gap-4">
                {/* <NotificationPopover/> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.url ? user.url : 'default.png'} alt="Avatar" />
                        <AvatarFallback>$</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {/* <p className="text-xs text-muted-foreground">{user.company}</p> */}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>router.push('/logout')}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
