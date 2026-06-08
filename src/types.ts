export interface ServiceCard {
  id: string;
  title: string;
  priceRange: string;
  period: string; // e.g. "per project", "per design"
  description: string;
  features: string[];
  gradient: string;
  glowColor: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatarSeed: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
}

export interface EnquiryForm {
  name: string;
  email: string;
  projectType: string;
  budgetRange: number; // slider value from 2000 to 40000
  message: string;
}
