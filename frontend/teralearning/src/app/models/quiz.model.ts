import { Question } from "./question.model";

export interface Quiz {
    quizId?: string;
    quizName?: string;
    mandatory?:boolean;
    summary?:string;
    topic?:string;
    questions?: Question[];
    shuffleQuestion?:boolean;
    status?: string
}
//Requires Topic model.
