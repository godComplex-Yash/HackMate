"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { currentUser, users } from "@/lib/data"
import { 
  FolderGit, 
  Users, 
  Trophy,
  Github,
  Code,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { useState, useEffect } from "react"

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  isLoading 
}: { 
  title: string
  value: string | number
  icon: React.ElementType
  isLoading: boolean
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-12" />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
              </>
            )}
          </div>
          <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TeammateCard({ user, isLoading }: { user: typeof users[0], isLoading: boolean }) {
  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-3 w-full mt-3" />
          <Skeleton className="h-3 w-3/4 mt-2" />
          <div className="flex gap-2 mt-3">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border hover:border-muted-foreground/50 transition-all hover:-translate-y-0.5 group">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full ring-2 ring-border"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{user.name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {user.availability === 'hackathon' ? 'Available' : 'Long-term'}
          </Badge>
        </div>
        
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {user.bio}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-1.5">
          {user.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs border-border">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Github className="h-3.5 w-3.5" />
              {user.githubStats.repos}
            </span>
            <span className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" />
              {user.githubStats.commits}
            </span>
          </div>
          <Button size="sm" variant="ghost" className="text-xs h-7">
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your hackathon journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Projects" 
          value={currentUser.stats.projects} 
          icon={FolderGit}
          isLoading={isLoading}
        />
        <StatCard 
          title="Teammates Found" 
          value={currentUser.stats.matches} 
          icon={Users}
          isLoading={isLoading}
        />
        <StatCard 
          title="Hackathons Joined" 
          value={currentUser.stats.hackathons} 
          icon={Trophy}
          isLoading={isLoading}
        />
      </div>

      {/* AI Match Suggestion */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Find your perfect match</h3>
              <p className="text-muted-foreground mt-1">
                Our AI has analyzed your profile and found developers who complement your skills perfectly.
              </p>
            </div>
            <Link href="/find-teammates">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0">
                View Matches
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Teammates */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Suggested Teammates</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Based on your skills and activity</p>
          </div>
          <Link href="/find-teammates">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.slice(0, 3).map((user) => (
            <TeammateCard key={user.id} user={user} isLoading={isLoading} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-card border-border hover:border-muted-foreground/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-foreground">Browse Hackathons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover upcoming hackathons and competitions to join with your team.
            </p>
            <Link href="/hackathons">
              <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-muted-foreground/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-foreground">Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add more projects and skills to get better teammate recommendations.
            </p>
            <Link href="/profile">
              <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
                Edit Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
