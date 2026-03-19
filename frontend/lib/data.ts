export const users = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about AI/ML. Previously at Google.',
    skills: ['React', 'Python', 'TensorFlow', 'Node.js'],
    experience: 'Senior',
    availability: 'hackathon',
    githubStats: { repos: 47, commits: 1243, contributions: 892 },
    projects: [
      { name: 'AI Code Assistant', description: 'VS Code extension with AI autocomplete', stars: 234 },
      { name: 'DataViz Pro', description: 'Interactive data visualization library', stars: 156 }
    ]
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    username: 'marcusdev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Backend specialist & DevOps enthusiast. Love building scalable systems.',
    skills: ['Go', 'Kubernetes', 'AWS', 'PostgreSQL'],
    experience: 'Mid',
    availability: 'long-term',
    githubStats: { repos: 32, commits: 876, contributions: 654 },
    projects: [
      { name: 'MicroScale', description: 'Microservices orchestration tool', stars: 89 },
      { name: 'LogStream', description: 'Real-time log aggregation', stars: 67 }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: 'emilyux',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'UI/UX designer who codes. Creating beautiful, accessible interfaces.',
    skills: ['Figma', 'React', 'Tailwind', 'Framer Motion'],
    experience: 'Senior',
    availability: 'hackathon',
    githubStats: { repos: 28, commits: 567, contributions: 423 },
    projects: [
      { name: 'DesignSystem', description: 'Open-source component library', stars: 567 },
      { name: 'AnimateKit', description: 'React animation primitives', stars: 234 }
    ]
  },
  {
    id: '4',
    name: 'Alex Kim',
    username: 'alexkim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Mobile developer specializing in cross-platform apps. Flutter expert.',
    skills: ['Flutter', 'Dart', 'Firebase', 'Swift'],
    experience: 'Mid',
    availability: 'hackathon',
    githubStats: { repos: 41, commits: 923, contributions: 712 },
    projects: [
      { name: 'FlutterKit', description: 'Flutter UI components', stars: 445 },
      { name: 'SyncApp', description: 'Real-time collaboration app', stars: 178 }
    ]
  },
  {
    id: '5',
    name: 'Jordan Taylor',
    username: 'jtaylor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Blockchain developer and Web3 enthusiast. Building the decentralized future.',
    skills: ['Solidity', 'Rust', 'Web3.js', 'Ethereum'],
    experience: 'Senior',
    availability: 'long-term',
    githubStats: { repos: 56, commits: 1567, contributions: 1234 },
    projects: [
      { name: 'DeFi Protocol', description: 'Decentralized lending platform', stars: 789 },
      { name: 'NFT Marketplace', description: 'Gas-efficient NFT trading', stars: 456 }
    ]
  },
  {
    id: '6',
    name: 'Priya Patel',
    username: 'priyacode',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Data scientist with a passion for ML. Turning data into insights.',
    skills: ['Python', 'PyTorch', 'SQL', 'Tableau'],
    experience: 'Mid',
    availability: 'hackathon',
    githubStats: { repos: 23, commits: 654, contributions: 498 },
    projects: [
      { name: 'MLPipeline', description: 'End-to-end ML workflow tool', stars: 312 },
      { name: 'DataClean', description: 'Automated data preprocessing', stars: 189 }
    ]
  }
]

export const hackathons = [
  {
    id: '1',
    name: 'ETHGlobal Bangkok',
    date: 'Nov 15-17, 2024',
    mode: 'offline',
    location: 'Bangkok, Thailand',
    description: 'Build the future of Ethereum at the largest Web3 hackathon in Southeast Asia.',
    prizes: '$500,000',
    participants: 1200,
    url: 'https://ethglobal.com'
  },
  {
    id: '2',
    name: 'Google Cloud Hackathon',
    date: 'Dec 1-15, 2024',
    mode: 'online',
    location: 'Virtual',
    description: 'Create innovative solutions using Google Cloud AI and ML services.',
    prizes: '$100,000',
    participants: 5000,
    url: 'https://cloud.google.com'
  },
  {
    id: '3',
    name: 'TreeHacks 2025',
    date: 'Feb 14-16, 2025',
    mode: 'offline',
    location: 'Stanford, CA',
    description: 'Stanford\'s flagship hackathon bringing together the brightest minds.',
    prizes: '$150,000',
    participants: 800,
    url: 'https://treehacks.com'
  },
  {
    id: '4',
    name: 'AI for Good',
    date: 'Jan 20-22, 2025',
    mode: 'online',
    location: 'Virtual',
    description: 'Use AI to tackle global challenges in health, climate, and education.',
    prizes: '$75,000',
    participants: 3000,
    url: 'https://aiforgood.org'
  },
  {
    id: '5',
    name: 'HackMIT',
    date: 'Sep 14-15, 2025',
    mode: 'offline',
    location: 'Cambridge, MA',
    description: 'MIT\'s annual hackathon empowering hackers to build amazing projects.',
    prizes: '$200,000',
    participants: 1000,
    url: 'https://hackmit.org'
  },
  {
    id: '6',
    name: 'Buildspace N&W S5',
    date: 'Mar 1-30, 2025',
    mode: 'online',
    location: 'Virtual',
    description: 'Build your startup idea from scratch in 30 days with a global community.',
    prizes: '$250,000',
    participants: 10000,
    url: 'https://buildspace.so'
  }
]

export const messages = [
  {
    id: '1',
    recipientId: '1',
    recipientName: 'Sarah Chen',
    recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'That sounds great! Let me know when you want to start.',
    timestamp: '2 min ago',
    unread: true,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hey Sarah! I saw your AI projects and would love to team up for ETHGlobal.', timestamp: '10:30 AM' },
      { id: 'm2', senderId: '1', text: 'Hi! Thanks for reaching out. I\'ve been looking for a team actually!', timestamp: '10:32 AM' },
      { id: 'm3', senderId: 'me', text: 'Perfect! I\'m thinking we could build something with LLMs and blockchain.', timestamp: '10:35 AM' },
      { id: 'm4', senderId: '1', text: 'That sounds great! Let me know when you want to start.', timestamp: '10:38 AM' }
    ]
  },
  {
    id: '2',
    recipientId: '3',
    recipientName: 'Emily Rodriguez',
    recipientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'I can help with the UI/UX part!',
    timestamp: '1 hour ago',
    unread: false,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hi Emily! Your design work is amazing.', timestamp: '9:00 AM' },
      { id: 'm2', senderId: '3', text: 'Thank you so much! What are you working on?', timestamp: '9:15 AM' },
      { id: 'm3', senderId: 'me', text: 'Building a hackathon project and need a designer.', timestamp: '9:20 AM' },
      { id: 'm4', senderId: '3', text: 'I can help with the UI/UX part!', timestamp: '9:25 AM' }
    ]
  },
  {
    id: '3',
    recipientId: '5',
    recipientName: 'Jordan Taylor',
    recipientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'The smart contract is almost ready.',
    timestamp: 'Yesterday',
    unread: false,
    messages: [
      { id: 'm1', senderId: '5', text: 'Hey! How\'s the frontend coming along?', timestamp: 'Yesterday 3:00 PM' },
      { id: 'm2', senderId: 'me', text: 'Making good progress! Should be done by tonight.', timestamp: 'Yesterday 3:30 PM' },
      { id: 'm3', senderId: '5', text: 'The smart contract is almost ready.', timestamp: 'Yesterday 4:00 PM' }
    ]
  }
]

export const currentUser = {
  id: 'current',
  name: 'John Developer',
  username: 'johndev',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face',
  bio: 'Full-stack developer building cool stuff. Always looking for hackathon partners!',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  experience: 'Senior',
  availability: 'hackathon',
  githubStats: { repos: 52, commits: 1876, contributions: 1423 },
  stats: {
    projects: 12,
    matches: 8,
    hackathons: 5
  },
  projects: [
    { name: 'TaskFlow', description: 'Project management with AI', stars: 342 },
    { name: 'CodeReview AI', description: 'Automated code review tool', stars: 567 },
    { name: 'DevMetrics', description: 'Developer productivity analytics', stars: 234 }
  ]
}

export const testimonials = [
  {
    id: '1',
    name: 'Michael Brown',
    role: 'Winner, ETHGlobal NYC',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    quote: 'Found my dream team on HackMate. We built an award-winning DeFi project in just 48 hours!'
  },
  {
    id: '2',
    name: 'Lisa Wang',
    role: 'Finalist, HackMIT',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    quote: 'The skill-based matching is incredible. I connected with developers who perfectly complemented my skills.'
  },
  {
    id: '3',
    name: 'David Park',
    role: 'Winner, TreeHacks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'No more last-minute scrambling for teammates. HackMate made team formation effortless.'
  }
]
