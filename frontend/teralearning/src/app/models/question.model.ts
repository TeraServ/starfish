import { QuestionOption } from "./question.option.model";
import {QuestionType} from './questionDetailEnum';

export interface Question {
    questionId?:number;
    quizId:number; 
    topic?:number;
    type: QuestionType;
    questionText: string;
    options?: Options;
    answers?: Options;
    explanation?: string;
    maxSelection?: number
    creator: Email;
}
type Options = QuestionOption[];
type DomainName = "com" | "ca" | "in";
type Email = `${ string | number}@ ${string | number}.${DomainName}`;
