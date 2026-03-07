export interface Data {
    question: string;
    file: string;
}
  
export interface Response {
    recommendation: string;
    links: string[];
    linkNum: number;
}