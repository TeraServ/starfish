import { Stream } from "./stream.model";
import { Subject } from "./subject.model";
import { topic } from "./topic.model";
import { user } from "./user.model";

export class quiz {
    id!: number;    
    topic:topic|any
    quizName!: string;
    passCriteria!:number;
    creator!:number;
    modifier!:number;
    TotalNoOfQuestion?:number | any;
    allowRetake!:boolean;


}