import { type User, type InsertUser, type ContactSubmission, type InsertContact, type Service, type Project, type Testimonial, type TeamMember, type TimelineEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getServices(): Promise<Service[]>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  getTeamMembers(): Promise<TeamMember[]>;
  getTimeline(): Promise<TimelineEvent[]>;
}

const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom web applications built with cutting-edge technologies. From responsive websites to complex web platforms, we deliver solutions that drive results.",
    icon: "Code2",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Progressive Web Apps",
      "API Development",
      "Performance Optimization"
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality. We create intuitive interfaces that users love and that convert visitors into customers.",
    icon: "Palette",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
      "Accessibility Audits"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that amplify your brand's reach. We help you connect with your audience and achieve measurable growth.",
    icon: "TrendingUp",
    features: [
      "SEO Optimization",
      "Content Marketing",
      "Social Media Strategy",
      "PPC Advertising",
      "Analytics & Reporting"
    ]
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description: "Build a memorable brand identity that resonates with your target audience. We craft brand stories that differentiate you from the competition.",
    icon: "Sparkles",
    features: [
      "Brand Identity Design",
      "Logo & Visual Assets",
      "Brand Guidelines",
      "Messaging Framework",
      "Competitive Analysis"
    ]
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.",
    icon: "Smartphone",
    features: [
      "iOS Development",
      "Android Development",
      "React Native Apps",
      "App Store Optimization",
      "Mobile UI/UX"
    ]
  },
  {
    id: "consulting",
    title: "Digital Consulting",
    description: "Strategic guidance to help you navigate the digital landscape. We provide insights and roadmaps for digital transformation.",
    icon: "Lightbulb",
    features: [
      "Digital Strategy",
      "Technology Assessment",
      "Process Optimization",
      "Growth Planning",
      "Team Training"
    ]
  }
];

const projects: Project[] = [
  {
    id: "fintech-dashboard",
    title: "FinTech Dashboard",
    category: "Web Development",
    description: "A comprehensive financial analytics platform with real-time data visualization and AI-powered insights for investment professionals.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    client: "WealthStream Capital",
    year: "2025",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    challenge: "Create a real-time dashboard that processes millions of data points while maintaining sub-second response times.",
    solution: "Implemented WebSocket connections with intelligent data aggregation and caching strategies, combined with optimized chart rendering.",
    results: ["40% faster data processing", "99.9% uptime achieved", "50K+ daily active users"]
  },
  {
    id: "ecommerce-platform",
    title: "Luxe Commerce",
    category: "E-commerce",
    description: "Premium e-commerce experience for a luxury fashion brand, featuring immersive product displays and personalized shopping journeys.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    client: "Maison Elegante",
    year: "2025",
    technologies: ["Next.js", "Shopify", "Tailwind CSS", "Stripe", "Algolia"],
    challenge: "Build an e-commerce platform that reflects the brand's luxury positioning while maximizing conversion rates.",
    solution: "Designed immersive product pages with 360-degree views, AR try-on features, and a seamless checkout experience.",
    results: ["85% increase in conversions", "3x average order value", "45% reduction in cart abandonment"]
  },
  {
    id: "healthcare-app",
    title: "MediConnect",
    category: "Mobile Development",
    description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers through secure video consultations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    client: "HealthFirst Network",
    year: "2023",
    technologies: ["React Native", "WebRTC", "AWS", "Node.js", "MongoDB"],
    challenge: "Develop a secure, reliable video consultation platform that works across various network conditions.",
    solution: "Built adaptive video streaming with automatic quality adjustment and end-to-end encryption for all communications.",
    results: ["100K+ consultations completed", "4.8 star app rating", "30% reduction in no-shows"]
  },
  {
    id: "saas-platform",
    title: "TeamSync Pro",
    category: "SaaS",
    description: "Enterprise project management platform with advanced collaboration features, resource planning, and AI-powered productivity insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    client: "Productivity Labs",
    year: "2023",
    technologies: ["Vue.js", "Python", "FastAPI", "Redis", "Elasticsearch"],
    challenge: "Create a scalable project management solution that handles enterprise-level workloads with real-time collaboration.",
    solution: "Implemented event-driven architecture with CQRS pattern, enabling real-time updates across thousands of concurrent users.",
    results: ["500+ enterprise clients", "2M+ tasks managed monthly", "35% productivity increase"]
  },
  {
    id: "brand-redesign",
    title: "Nexus Rebrand",
    category: "Brand Strategy",
    description: "Complete brand transformation for a tech startup, including visual identity, messaging framework, and go-to-market strategy.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
    client: "Nexus Technologies",
    year: "2025",
    technologies: ["Figma", "Adobe CC", "Brand Strategy", "Market Research"],
    challenge: "Reposition a B2B tech company as an innovative leader in their industry while maintaining existing client relationships.",
    solution: "Developed a sophisticated brand identity with a bold color palette, modern typography, and compelling brand narrative.",
    results: ["200% increase in brand awareness", "60% more qualified leads", "Featured in 5 industry publications"]
  },
  {
    id: "ai-platform",
    title: "InsightAI",
    category: "AI/ML",
    description: "Machine learning platform that automates customer support with natural language processing and sentiment analysis.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    client: "SupportTech Inc",
    year: "2025",
    technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI", "PostgreSQL"],
    challenge: "Build an AI system that can handle complex customer queries while maintaining high accuracy and human-like responses.",
    solution: "Developed a hybrid AI system combining fine-tuned LLMs with retrieval-augmented generation for accurate, contextual responses.",
    results: ["80% automation rate", "95% customer satisfaction", "60% cost reduction"]
  }
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechVentures Inc",
    content: "Ranjit Agency transformed our digital presence completely. Their strategic approach and attention to detail exceeded our expectations. The results speak for themselves - our conversions increased by 150% within three months.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateTech",
    content: "Working with Ranjit was a game-changer for our startup. They delivered a scalable platform that handles our growing user base effortlessly. Their technical expertise and communication are truly world-class.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Global Brands Co",
    content: "The brand strategy they developed for us was nothing short of brilliant. They understood our vision and translated it into a compelling identity that resonates with our audience. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "4",
    name: "David Park",
    role: "Founder",
    company: "NextGen Solutions",
    content: "From concept to launch, Ranjit handled everything professionally. Their team's creativity and technical skills are matched only by their dedication to client success. They're now our go-to digital partner.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "VP of Product",
    company: "HealthFirst",
    content: "Ranjit delivered our healthcare platform on time and within budget. Their understanding of compliance requirements and user experience made them the perfect partner for our mission-critical project.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
];

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alexandra Sterling",
    role: "CEO & Founder",
    bio: "With 15+ years in digital strategy, Alexandra leads Ranjit with a vision for innovative, client-focused solutions that drive measurable results.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "2",
    name: "Marcus Wei",
    role: "Technical Director",
    bio: "A full-stack architect with expertise in scalable systems, Marcus ensures every project is built on a foundation of technical excellence.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: "3",
    name: "Olivia Martinez",
    role: "Creative Director",
    bio: "Olivia's award-winning designs have shaped brands across industries. She brings artistry and strategy to every creative challenge.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "4",
    name: "James Cooper",
    role: "Head of Strategy",
    bio: "James combines data-driven insights with creative thinking to develop strategies that position our clients for sustainable growth.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: "5",
    name: "Sophie Chen",
    role: "UX Lead",
    bio: "Sophie crafts user experiences that delight and convert. Her human-centered approach ensures every interaction is intuitive and meaningful.",
    avatar: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#" }
  },
  {
    id: "6",
    name: "Ryan Brooks",
    role: "Development Lead",
    bio: "Ryan leads our development team with a focus on clean code and cutting-edge technologies. He turns complex requirements into elegant solutions.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    social: { linkedin: "#", github: "#" }
  }
];

const timeline: TimelineEvent[] = [
  {
    id: "1",
    year: "2015",
    title: "Founded in San Francisco",
    description: "Started as a small team of three passionate designers and developers with a shared vision for exceptional digital experiences."
  },
  {
    id: "2",
    year: "2017",
    title: "First Major Enterprise Client",
    description: "Landed our first Fortune 500 client, marking our transition from startup to established agency."
  },
  {
    id: "3",
    year: "2019",
    title: "International Expansion",
    description: "Opened offices in London and Tokyo, expanding our global reach and diverse client portfolio."
  },
  {
    id: "4",
    year: "2021",
    title: "100+ Projects Milestone",
    description: "Celebrated completing over 100 successful projects and grew our team to 50+ talented professionals."
  },
  {
    id: "5",
    year: "2023",
    title: "Industry Recognition",
    description: "Won multiple Webby Awards and ranked among the top 10 digital agencies globally."
  },
  {
    id: "6",
    year: "2025",
    title: "AI & Innovation Lab",
    description: "Launched our AI Innovation Lab, pioneering next-generation solutions for our clients."
  }
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async getServices(): Promise<Service[]> {
    return services;
  }

  async getProjects(): Promise<Project[]> {
    return projects;
  }

  async getProject(id: string): Promise<Project | undefined> {
    return projects.find((p) => p.id === id);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return teamMembers;
  }

  async getTimeline(): Promise<TimelineEvent[]> {
    return timeline;
  }
}

export const storage = new MemStorage();
