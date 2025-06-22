"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Award,
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  Filter,
  Laptop,
  Lightbulb,
  Loader2,
  Play,
  Search,
  Users,
  RefreshCw,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import Image from "next/image"
import api from "@/lib/api"


const CATEGORIES = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "resume", name: "Resume Building", icon: FileText },
  { id: "interview", name: "Interview Preparation", icon: Users },
  { id: "technical", name: "Technical Skills", icon: Code },
  { id: "aptitude", name: "Aptitude & Reasoning", icon: Lightbulb },
  { id: "soft-skills", name: "Soft Skills", icon: Award },
]
const TYPES = [
  { id: "all", name: "All Types" },
  { id: "video", name: "Videos" },
  { id: "document", name: "Documents" },
  { id: "course", name: "Courses" },
  { id: "quiz", name: "Quizzes" },
  { id: "event", name: "Events & Workshops" },
]


export function StudentResources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [typeFilter, setTypeFilter] = useState([])
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchResources = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }

      if (typeFilter.length > 0) {
        typeFilter.forEach((type) => params.append("type", type))
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const response = await api.get(`/student/resources?${params}`)

      if (!response) {
      toast.error("Failed to fetch resources")
      }

      const data = response.data.resources
      setResources(data)

    } catch (err) {
      toast.error("Failed to load resources")
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, typeFilter, searchQuery])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "course":
        return <Laptop className="h-4 w-4" />
      case "quiz":
        return <Lightbulb className="h-4 w-4" />
      case "event":
      case "workshop":
        return <Users className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setTypeFilter([])
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive">Error Loading Resources</h3>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
        <Button onClick={() => fetchResources()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
          <p className="text-muted-foreground">
            Access learning materials, guides, and practice resources to prepare for your placement journey.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources, topics, or keywords..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Resource Type
                {typeFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {typeFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {TYPES.slice(1).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.id}
                  checked={typeFilter.includes(type.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, type.id])
                    } else {
                      setTypeFilter(typeFilter.filter((t) => t !== type.id))
                    }
                  }}
                >
                  {type.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-6 px-6 space-x-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex-shrink-0"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {selectedCategory !== "all" ? CATEGORIES.find((c) => c.id === selectedCategory)?.name : "All Resources"}
          </h3>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                `Showing ${resources.length} resources`
              )}
            </p>
            {(searchQuery || selectedCategory !== "all" || typeFilter.length > 0) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted animate-pulse" />
                <CardHeader className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No resources found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn&apos;t find any resources matching your current filters. Try adjusting your search or filters.
              </p>
              <Button className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </Card>
        ) : (
          <Tabs defaultValue="grid">
            <div className="flex justify-end">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={resource.thumbnail || "/resource.jpg?height=200&width=300"}
                        alt={resource.title}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getResourceIcon(resource.type)}
                          {TYPES.find((t) => t.id === resource.type)?.name.slice(0, -1) || resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-6 w-6">
                            <AvatarFallback className="text-xs">{resource.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{resource.author}</span>
                        </div>
                        <span className="text-xs">{resource.source}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Resource
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 md:w-60">
                        <div className="aspect-video w-full overflow-hidden bg-muted sm:h-full">
                          <Image
                            src={resource.thumbnail || "/resource.jpg?height=200&width=300"}
                            alt={resource.title}
                            width={300}
                            height={200}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getResourceIcon(resource.type)}
                            {TYPES.find((t) => t.id === resource.type)?.name.slice(0, -1) || resource.type}
                          </Badge>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{resource.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {resource.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 5}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarFallback className="text-xs">{resource.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="mr-2">{resource.author}</span>
                              <span>•</span>
                              <span className="ml-2">{resource.source}</span>
                            </div>
                            <span className="text-xs">{new Date(resource.date).toLocaleDateString()}</span>
                          </div>
                          <Button className="w-full" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              Visit Resource
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
