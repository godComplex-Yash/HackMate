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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Empty } from "@/components/ui/empty"
import { hackathons } from "@/lib/data"
import { 
  Search,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ExternalLink,
  Plus,
  Globe,
  Building
} from "lucide-react"

export default function HackathonsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [modeFilter, setModeFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      // Search filter
      const matchesSearch = !searchQuery || 
        hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Mode filter
      const matchesMode = modeFilter === "all" || hackathon.mode === modeFilter

      return matchesSearch && matchesMode
    })
  }, [searchQuery, modeFilter, dateFilter])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hackathons & Competitions</h1>
          <p className="text-muted-foreground mt-1">Discover upcoming events and find your next challenge</p>
        </div>
        <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Submit Hackathon
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">Submit a Hackathon</DialogTitle>
            </DialogHeader>
            <FieldGroup className="py-4">
              <Field>
                <FieldLabel>Hackathon Name</FieldLabel>
                <Input placeholder="e.g., ETHGlobal Tokyo" className="bg-input border-border" />
              </Field>
              <Field>
                <FieldLabel>Website URL</FieldLabel>
                <Input placeholder="https://..." className="bg-input border-border" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Start Date</FieldLabel>
                  <Input type="date" className="bg-input border-border" />
                </Field>
                <Field>
                  <FieldLabel>End Date</FieldLabel>
                  <Input type="date" className="bg-input border-border" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Mode</FieldLabel>
                <Select defaultValue="online">
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">In-person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Location</FieldLabel>
                <Input placeholder="City, Country or 'Virtual'" className="bg-input border-border" />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea placeholder="Tell us about this hackathon..." className="bg-input border-border min-h-[80px]" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setIsSubmitOpen(false)}>
                Submit for Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-input border-border">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">In-person</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-input border-border">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="next-month">Next Month</SelectItem>
            <SelectItem value="next-3-months">Next 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filteredHackathons.length === 0 ? (
        <Empty className="py-16">
          <Empty.Icon>
            <Trophy className="h-10 w-10 text-muted-foreground" />
          </Empty.Icon>
          <Empty.Title>No hackathons found</Empty.Title>
          <Empty.Description>
            Try adjusting your filters or search query.
          </Empty.Description>
          <Empty.Actions>
            <Button variant="outline" onClick={() => {
              setSearchQuery("")
              setModeFilter("all")
              setDateFilter("all")
            }}>
              Clear Filters
            </Button>
          </Empty.Actions>
        </Empty>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {filteredHackathons.length} hackathon{filteredHackathons.length !== 1 ? 's' : ''}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHackathons.map((hackathon) => (
              <Card key={hackathon.id} className="bg-card border-border hover:border-muted-foreground/50 transition-all hover:-translate-y-0.5 group flex flex-col">
                <CardContent className="p-5 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{hackathon.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={hackathon.mode === 'online' ? 'secondary' : 'outline'} 
                          className="text-xs capitalize"
                        >
                          {hackathon.mode === 'online' ? (
                            <Globe className="h-3 w-3 mr-1" />
                          ) : (
                            <Building className="h-3 w-3 mr-1" />
                          )}
                          {hackathon.mode}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-accent">{hackathon.prizes}</p>
                      <p className="text-xs text-muted-foreground">in prizes</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {hackathon.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{hackathon.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{hackathon.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>{hackathon.participants.toLocaleString()} participants</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a 
                      href={hackathon.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Featured Banner */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-accent/10 via-transparent to-transparent">
            <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Host your own hackathon?</h3>
              <p className="text-muted-foreground mt-1">
                List your event on HackMate and reach thousands of talented developers.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-border hover:bg-secondary flex-shrink-0"
              onClick={() => setIsSubmitOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
