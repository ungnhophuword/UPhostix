export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  pricing: {
    basic: string;
    premium: string;
    enterprise: string;
  };
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Branding' | 'SEO';
  description: string;
  image: string;
  tags: string[];
  link: string;
  stats?: { label: string; value: string };
  client?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Tech' | 'SEO' | 'Design' | 'Marketing';
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  budget: string;
  message: string;
  createdAt: string;
}
