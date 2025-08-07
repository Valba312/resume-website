// Типы для данных резюме
export interface Contact {
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'telegram';
  value: string;
  label: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'other';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Fact {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: 'achievement' | 'skill' | 'project' | 'education' | 'certificate';
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    photo: string;
    about: string;
    contacts: Contact[];
  };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certificates: Certificate[];
  facts: Fact[];
}

// Типы для админ-панели
export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
} 