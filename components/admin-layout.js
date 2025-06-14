"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {BarChart, Building, Calendar, GraduationCap, Home, LogOut, Menu, Settings, User, Users, Briefcase, FileText} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { NotificationPopover } from "./ui/notification-popover"

export function AdminLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const pathname = usePathname();

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
                <AvatarImage src={user.url ? user.url : "default.png"} alt="Avatar" />
                <AvatarFallback>$</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                      <Link href="/admin/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/companies"}>
                      <Link href="/admin/companies">
                        <Building className="h-4 w-4" />
                        <span>Company Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/students"}>
                      <Link href="/admin/students">
                        <Users className="h-4 w-4" />
                        <span>Student Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/drives"}>
                      <Link href="/admin/drives">
                        <Briefcase className="h-4 w-4" />
                        <span>Drive Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/pending-jobs"}>
                      <Link href="/admin/pending-jobs">
                        <FileText className="h-4 w-4" />
                        <span>Pending Job Posts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/contact-hrs"}>
                      <Link href="/admin/contact-hrs">
                        <User className="h-4 w-4" />
                        <span>Contact HR's</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/analytics"}>
                      <Link href="/admin/analytics">
                        <BarChart className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/calendar"}>
                      <Link href="/admin/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule Management</span>
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
                      <Link href="/admin/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/companies">
                        <Building className="mr-2 h-4 w-4" />
                        Company Management
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/students">
                        <Users className="mr-2 h-4 w-4" />
                        Student Management
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/drives">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Drive Management
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/pending-jobs">
                        <FileText className="mr-2 h-4 w-4" />
                        Pending Job Posts
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/contact-hrs">
                        <User className="mr-2 h-4 w-4" />
                        Contact HR's
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/analytics">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/admin/calendar">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Management
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <h1 className="text-xl font-bold">E-Placo Admin</h1>
              </div>
              <div className="flex items-center gap-4">
                {/* <NotificationPopover/> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className={'cursor-pointer'}>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.url ? user.url : "default.png"} alt="Avatar" />
                        <AvatarFallback>$</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>router.push('/admin/settings')} className={'cursor-pointer'}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>router.push('/logout')} className={'cursor-pointer'}>
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
