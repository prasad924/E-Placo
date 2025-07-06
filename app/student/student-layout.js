"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  Award,
  User,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { usePathname } from "next/navigation"
import { SliderButton } from "@/components/ui/darkThemeSlider"

export function StudentLayout({ children }) {
  const router = useRouter()
  const {user} = useAuth()
  const pathname = usePathname()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-dvw">
        <Sidebar className="hidden md:flex border-r">
          <SidebarHeader className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <h1 className="text-xl font-bold">E-Placo</h1>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary/50">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.url ? user.url : "/default.png"} alt="Avatar" />
                <AvatarFallback>$</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.id}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/dashboard'}>
                      <Link href="/student/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/drives'}>
                      <Link href="/student/drives">
                        <Briefcase className="h-4 w-4" />
                        <span>Placement Drives</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/applied-jobs'}>
                      <Link href="/student/applied-jobs">
                        <Briefcase className="h-4 w-4" />
                        <span>Applied Jobs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/profile'}>
                      <Link href="/student/profile">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/calendar'}>
                      <Link href="/student/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Interview Calendar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/resources'}>
                      <Link href="/student/resources">
                        <BookOpen className="h-4 w-4" />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/companies'}>
                      <Link href="/student/companies">
                        <Building className="h-4 w-4" />
                        <span>Companies</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/student/analytics'}>
                      <Link href="/student/analytics">
                        <Award className="h-4 w-4" />
                        <span>Analytics</span>
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
                      <Link href="/student/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/drives">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Placement Drives
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/calendar">
                        <Calendar className="mr-2 h-4 w-4" />
                        Interview Calendar
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/resources">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Resources
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/companies">
                        <Building className="mr-2 h-4 w-4" />
                        Companies
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/student/statistics">
                        <Building className="mr-2 h-4 w-4" />
                        Statistics
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <h1 className="text-xl font-bold">E-Placo Student</h1>
              </div>
              <div className="flex items-center gap-4">
                <SliderButton/>
                {/* <NotificationPopover/> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.url ? user.url : "/default.png"} alt="Avatar" />
                        <AvatarFallback>$</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.id}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> router.push('/student/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> router.push('/logout')}>
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
