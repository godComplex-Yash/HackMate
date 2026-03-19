"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { currentUser } from "@/lib/data"
import { 
  Github, 
  Code, 
  GitFork,
  Star,
  Edit,
  MapPin,
  Calendar,
  ExternalLink,
  Plus,
  X
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    skills: currentUser.skills,
    newSkill: ""
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const addSkill = () => {
    if (editData.newSkill.trim() && !editData.skills.includes(editData.newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, editData.newSkill.trim()],
        newSkill: ""
      })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(skill => skill !== skillToRemove)
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <Card className="bg-card border-border overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-secondary via-muted to-secondary" />
        
        <CardContent className="relative pt-0 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-32 w-32 rounded-2xl ring-4 ring-card"
            />
          </div>

          {/* Edit Button */}
          <div className="flex justify-end pt-4">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-border hover:bg-secondary">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Edit Profile</DialogTitle>
                </DialogHeader>
                <FieldGroup className="py-4">
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="bg-input border-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Bio</FieldLabel>
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="bg-input border-border min-h-[100px]"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Skills</FieldLabel>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                          {skill}
                          <button 
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-muted rounded p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={editData.newSkill}
                        onChange={(e) => setEditData({ ...editData, newSkill: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="bg-input border-border"
                      />
                      <Button type="button" variant="outline" onClick={addSkill} className="border-border">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Spinner className="h-4 w-4 mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Profile Info */}
          <div className="mt-8 sm:mt-4 sm:ml-40">
            <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.username}</p>
            
            <p className="mt-4 text-foreground max-w-xl leading-relaxed">
              {currentUser.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Joined March 2023
              </span>
              <a 
                href={`https://github.com/${currentUser.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                {currentUser.username}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {currentUser.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Stats */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <GitFork className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{currentUser.githubStats.repos}</p>
              <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <Code className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{currentUser.githubStats.commits}</p>
              <p className="text-sm text-muted-foreground">Commits</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <Star className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{currentUser.githubStats.contributions}</p>
              <p className="text-sm text-muted-foreground">Contributions</p>
            </div>
          </div>

          {/* Activity Graph Placeholder */}
          <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground mb-3">Contribution Activity</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const intensity = Math.random()
                    let bgClass = "bg-muted/50"
                    if (intensity > 0.8) bgClass = "bg-accent"
                    else if (intensity > 0.6) bgClass = "bg-accent/70"
                    else if (intensity > 0.4) bgClass = "bg-accent/40"
                    else if (intensity > 0.2) bgClass = "bg-accent/20"
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`h-2.5 w-2.5 rounded-sm ${bgClass}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Projects</CardTitle>
          <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUser.projects.map((project, index) => (
              <Card key={index} className="bg-secondary/30 border-border hover:border-muted-foreground/50 transition-colors">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      {project.stars}
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
