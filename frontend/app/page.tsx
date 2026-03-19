import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { testimonials, users } from "@/lib/data"
import { 
  Sparkles, 
  Shield, 
  Zap, 
  ArrowRight, 
  Github, 
  Quote,
  Users,
  Trophy,
  Code
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Now with AI-powered matching
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
              Find the Perfect Hackathon Teammates{" "}
              <span className="text-muted-foreground">Instantly</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Match with developers based on real skills and GitHub activity. No more last-minute scrambles. Build winning teams in seconds.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/find-teammates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-border hover:bg-secondary">
                  Explore Builders
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Developers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Teams Formed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Hackathon Wins</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Why teams choose HackMate
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built by hackathon winners, for hackathon winners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:border-muted-foreground/50 transition-colors group">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Smart Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes skills, GitHub activity, and past projects to suggest teammates who complement your strengths.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-muted-foreground/50 transition-colors group">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real Builders Only</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proof of work, not resumes. Every profile is backed by real GitHub contributions and verified projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-muted-foreground/50 transition-colors group">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Hackathon Ready</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instant team formation for any hackathon. Filter by availability, timezone, and experience level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Builders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Featured Builders
              </h2>
              <p className="mt-2 text-muted-foreground">
                Top developers ready to team up
              </p>
            </div>
            <Link href="/find-teammates">
              <Button variant="outline" className="hidden sm:flex border-border hover:bg-secondary">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.slice(0, 3).map((user) => (
              <Card key={user.id} className="bg-card border-border hover:border-muted-foreground/50 transition-all hover:-translate-y-1 group">
                <CardContent className="p-6">
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
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{user.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        {user.githubStats.repos} repos
                      </span>
                      <span className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        {user.githubStats.commits} commits
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/find-teammates">
              <Button variant="outline" className="border-border hover:bg-secondary">
                View All Builders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From signup to winning hackathon in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-foreground" />
              </div>
              <div className="text-sm font-medium text-accent mb-2">Step 1</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Connect your GitHub and showcase your skills. Let your work speak for itself.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-foreground" />
              </div>
              <div className="text-sm font-medium text-accent mb-2">Step 2</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get Matched</h3>
              <p className="text-muted-foreground">
                Our AI suggests teammates based on complementary skills and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-foreground" />
              </div>
              <div className="text-sm font-medium text-accent mb-2">Step 3</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Win Together</h3>
              <p className="text-muted-foreground">
                Form your team, join a hackathon, and build something amazing together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Loved by winners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who found their perfect team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                  <p className="text-foreground leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to find your dream team?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers building the future together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/hackathons">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-border hover:bg-secondary">
                Browse Hackathons
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
