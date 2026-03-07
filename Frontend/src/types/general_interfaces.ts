export interface BackendResult {
    recommendation: string;
    links: string[];
    linkNum: number;
  }

export interface ScrapedPage {
    url: string;
    title: string;
    selector: string;
    text: string;
    html: string;
    links: string[];
  };