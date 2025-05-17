
export interface Candidate {
  id: string;
  name: string;
  role: string;
  skills: string[];
  location: string;
  experience_years: number;
  job_type: "Full-Time" | "Part-Time" | "Contract" | "Freelance";
  seniority: "Junior" | "Mid" | "Senior" | "Lead";
  availability: string;
  projects: Project[];
  match_score?: number;
}

export interface Project {
  title: string;
  description: string;
  tools_used: string[];
  link: string;
}

export interface SearchQuery {
  role: string;
  skills: string[];
  location: string;
  job_type: string;
  seniority: string;
  notes: string;
}

export interface ApiKeys {
  openaiKey: string;
  linkedinKey: string;
}
