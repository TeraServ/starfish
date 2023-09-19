import { QuestionOption } from "./question.option.model";
import {QuestionType} from './questionDetailEnum';
import { Quiz } from "./quiz.model";

export interface Question {
    id?:number;
    quiz?:Quiz; 
    topic?:number;
    questionType: QuestionType;
    questionText: string;
    options?: Options;
    answers?: Options;
    explanation?: string;
    maximumSelectionAllowed?: number
    creator: Email | number;
    modifier?: Email | number;
    createdDate?: string;
    modifiedDate?: string;
}
type Options = QuestionOption[];
type DomainName = "com" | "ca" | "in";
export type Email = `${ string | number}@ ${string | number}.${DomainName}`;