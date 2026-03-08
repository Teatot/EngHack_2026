// Interface representing the data structure for a request to the Gemini API, including a question and a file path
export interface Data {
    question: string;
    file: string;
}

// Interface representing an improvement, including its name and a link to a resource for improvement
export interface Improvement {
    name: string;
    link: string;
}

//  Interface representing a skill, including its name and a list of improvements with their names and links to resources for improvement
export interface Skill {
    name: string;
    improvements: Improvement[];
}

// Interface for the structured response from the Gemini API, including a recommendation, match score, and lists of skills the user has and is missing, along with improvements for each skill
export interface Response {
    recommendation: string;
    matchScore: number;
    have: Skill[];
    missing: Skill[];
}