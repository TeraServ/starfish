import { Question } from "src/app/models/question.model";
import { Stream } from "./stream.model";
import { Subject } from "./subject.model";
import { Topic } from "./topic.model";
import { user } from "./user.model";

export class quiz {
    id!: number;    
    topic:Topic|any
    quizName!: string;
    passCriteria!:number;
    creator!:number;
    modifier!:number;
    TotalNoOfQuestion?:number | any;
    allowRetake!:boolean;
    questions?: Question[];


}