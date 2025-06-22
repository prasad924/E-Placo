"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  MapPin,
  Users,
  DollarSign,
  Star,
  Search,
  Eye,
  ExternalLink,
  Calendar,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function StudentCompanies() {
  const router = useRouter()
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Software",
    "Services",
    "Finance",
    "Healthcare",
    "Manufacturing",
    "Consulting",
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const response = await api.get("/student/companies");
        if (!response) {
          toast("Failed to fetch companies");
        }
        const data = await response.data?.companies;
        setCompanies(data);
      } catch (err) {
        toast("Error fetching companies: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (company) => {
    router.push(`/student/company/${company._id}`);
  };

  const getCompanySize = (size) => {
    if (!size) return "Not specified";
    return size;
  };

  const getTotalOpenings = (departments) => {
    if (!departments || departments.length === 0) return 0;
    return departments.reduce((total, dept) => total + (dept.openings || 0), 0);
  };

  const getHiringStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "hiring":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.description &&
        company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.tagline &&
        company.tagline.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || company.industry === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">Loading companies...</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">
            Explore {companies.length} companies and their opportunities
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredCompanies.length} of {companies.length} companies
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Card
            key={company._id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={company.logo || "/company_logo.png?height=48&width=48"}
                    alt={company.name}
                    className="rounded-lg object-cover"
                    height={48}
                    width={48}
                  />
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </div>
                </div>
                <Badge className={getHiringStatusColor(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {company.tagline && (
                <p className="text-sm font-medium text-blue-600">
                  {company.tagline}
                </p>
              )}

              {company.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                {company.headquarters && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{company.headquarters}</span>
                  </div>
                )}
                {company.size && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{getCompanySize(company.size)}</span>
                  </div>
                )}
                {company.stats?.avgSalary && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{company.stats.avgSalary}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{getTotalOpenings(company.departments)} positions</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{company.rating.toFixed(1)}</span>
                </div>
                {company.founded && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Est. {company.founded}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 cursor-pointer"
                  onClick={() => handleCompanyClick(company)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={'cursor-pointer'}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://${company.website}`, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No companies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
}
