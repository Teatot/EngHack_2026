export interface Data {
    question: string;
}
  
export interface Response {
    recommendation: string;
    links: string[];
    linkNum: number;
}