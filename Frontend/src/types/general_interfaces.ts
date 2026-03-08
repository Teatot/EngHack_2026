export interface Improvement {
  name: string;
  link: string;
}

export interface AnalysisSkill {
  name: string;
  improvements: Improvement[];
}

export interface BackendResult {
  recommendation: string;
  matchScore: number;
  have: AnalysisSkill[];
  missing: AnalysisSkill[];
}

export interface ScrapedPage {
  url: string;
  title: string;
  selector: string;
  text: string;
  html: string;
  links: string[];
};