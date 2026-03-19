"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Empty } from "@/components/ui/empty"
import { users } from "@/lib/data"
import { 
  Search, 
  Filter,
  Github,
  Code,
  UserPlus,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Sparkles
} from "lucide-react"

const skillOptions = ["React", "Python", "Node.js", "TypeScript", "Go", "Rust", "Flutter", "AWS", "Kubernetes", "TensorFlow", "Solidity", "Web3.js"]
const experienceOptions = ["Junior", "Mid", "Senior"]
const availabilityOptions = [
  { value: "hackathon", label: "Hackathon" },
  { value: "long-term", label: "Long-term" },
  { value: "all", label: "All" }
]

export default function FindTeammatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [experience, setExperience] = useState<string>("all")
  const [availability, setAvailability] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "swipe">("grid")

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter
      const matchesSearch = !searchQuery || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      
      // Skills filter
      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.some(skill => user.skills.includes(skill))
      
      // Experience filter
      const matchesExperience = experience === "all" ||
        user.experience.toLowerCase() === experience.toLowerCase()
      
      // Availability filter
      const matchesAvailability = availability === "all" ||
        user.availability === availability

      return matchesSearch && matchesSkills && matchesExperience && matchesAvailability
    })
  }, [searchQuery, selectedSkills, experience, availability])

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSkills([])
    setExperience("all")
    setAvailability("all")
  }

  const hasActiveFilters = searchQuery || selectedSkills.length > 0 || experience !== "all" || availability !== "all"

  const handleConnect = (userId: string) => {
    console.log("[v0] Connect with user:", userId)
    if (viewMode === "swipe") {
      setCurrentCardIndex(prev => Math.min(prev + 1, filteredUsers.length - 1))
    }
  }

  const handleSkip = () => {
    setCurrentCardIndex(prev => Math.min(prev + 1, filteredUsers.length - 1))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Teammates</h1>
          <p className="text-muted-foreground mt-1">Discover developers who match your project needs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="text-sm"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "swipe" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              setViewMode("swipe")
              setCurrentCardIndex(0)
            }}
            className="text-sm"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Swipe
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-border hover:bg-secondary"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                {selectedSkills.length + (experience !== "all" ? 1 : 0) + (availability !== "all" ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Filters</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                    Clear all
                  </Button>
                )}
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedSkills.includes(skill) 
                          ? "bg-accent text-accent-foreground hover:bg-accent/80" 
                          : "border-border hover:bg-secondary"
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Experience */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Experience Level</p>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All levels</SelectItem>
                      {experienceOptions.map((exp) => (
                        <SelectItem key={exp} value={exp.toLowerCase()}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Availability</p>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active filters badges */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                {skill}
                <button 
                  onClick={() => toggleSkill(skill)}
                  className="ml-1 hover:bg-muted rounded p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredUsers.length === 0 ? (
        <Empty className="py-16">
          <Empty.Icon>
            <Users className="h-10 w-10 text-muted-foreground" />
          </Empty.Icon>
          <Empty.Title>No teammates found</Empty.Title>
          <Empty.Description>
            Try adjusting your filters or search query to find more developers.
          </Empty.Description>
          <Empty.Actions>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Empty.Actions>
        </Empty>
      ) : viewMode === "grid" ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} developer{filteredUsers.length !== 1 ? 's' : ''}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-card border-border hover:border-muted-foreground/50 transition-all hover:-translate-y-0.5 group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-14 w-14 rounded-full ring-2 ring-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {user.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs border-border">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs border-border">
                        +{user.skills.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Github className="h-3.5 w-3.5" />
                        {user.githubStats.repos} repos
                      </span>
                      <span className="flex items-center gap-1">
                        <Code className="h-3.5 w-3.5" />
                        {user.githubStats.commits}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {user.experience}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleConnect(user.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Swipe Mode */
        <div className="flex flex-col items-center py-8">
          {currentCardIndex < filteredUsers.length ? (
            <>
              <Card className="w-full max-w-md bg-card border-border">
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={filteredUsers[currentCardIndex].avatar}
                      alt={filteredUsers[currentCardIndex].name}
                      className="h-24 w-24 rounded-full ring-4 ring-border mx-auto"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-foreground">
                      {filteredUsers[currentCardIndex].name}
                    </h3>
                    <p className="text-muted-foreground">@{filteredUsers[currentCardIndex].username}</p>
                  </div>
                  
                  <p className="mt-4 text-center text-muted-foreground">
                    {filteredUsers[currentCardIndex].bio}
                  </p>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {filteredUsers[currentCardIndex].skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Github className="h-4 w-4" />
                      {filteredUsers[currentCardIndex].githubStats.repos} repos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Code className="h-4 w-4" />
                      {filteredUsers[currentCardIndex].githubStats.commits} commits
                    </span>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-border hover:bg-secondary"
                      onClick={handleSkip}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Skip
                    </Button>
                    <Button 
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => handleConnect(filteredUsers[currentCardIndex].id)}
                    >
                      Connect
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="mt-4 text-sm text-muted-foreground">
                {currentCardIndex + 1} of {filteredUsers.length}
              </p>
            </>
          ) : (
            <Empty className="py-16">
              <Empty.Icon>
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </Empty.Icon>
              <Empty.Title>You've seen everyone!</Empty.Title>
              <Empty.Description>
                Check back later for new teammates or adjust your filters.
              </Empty.Description>
              <Empty.Actions>
                <Button variant="outline" onClick={() => setCurrentCardIndex(0)}>
                  Start Over
                </Button>
              </Empty.Actions>
            </Empty>
          )}
        </div>
      )}
    </div>
  )
}
