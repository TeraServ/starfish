import { Chapter } from "./chapter.model";
import { Topic } from "./topic.model";

export class Course{
    id!:number;
    courseName!:string;
    topic!:Topic;
    coverUrl!:string;
    description!:string;
    createdBy!:number;
    chapters!:Chapter[]

}