export interface AnalysisSkill {
  name: string;
  improvements: string[];
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