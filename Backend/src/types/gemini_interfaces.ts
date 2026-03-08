export interface Data {
    question: string;
    file: string;
}

export interface Improvement {
    name: string;
    link: string;
}

export interface Skill {
    name: string;
    improvements: Improvement[];
}

export interface Response {
    recommendation: string;
    matchScore: number;
    have: Skill[];
    missing: Skill[];
}