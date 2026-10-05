export type SectionId =
  | 'home'
  | 'about'
  | 'projects'
  | 'tech'
  | 'experience'
  | 'hackathons'
  | 'resume'
  | 'contact';

export type SectionState = 'idle' | 'entering' | 'active' | 'leaving';

export interface MultiverseNode {
  id: SectionId;
  label: string;
  tag: string;
  iconName: string;
  pathOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'analytics' | 'ai' | 'data' | 'fullstack';
  description: string;
  image: string;
  tags: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'OPERATIONAL' | 'DEPLOYED' | 'IN_PRODUCTION';
}

export interface TechCategory {
  title: string;
  icon: string;
  skills: Array<{
    name: string;
    level: string;
    percentage: number;
  }>;
}

export interface ExperienceItem {
  epoch: string;
  title: string;
  organization: string;
  description: string;
  type: 'operation' | 'education' | 'certification';
}

export interface HackathonRecord {
  metric: string;
  value: number;
  suffix?: string;
  label: string;
  detail: string;
}
