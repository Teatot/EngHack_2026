export interface Data {
    question: string;
    file: string;
}

export interface Skill {
    name: string;
    improvements: string[];
}

export interface Response {
    recommendation: string;
    matchScore: number;
    have: Skill[];
    missing: Skill[];
}