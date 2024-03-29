import { Stream } from "./stream.model";
import { Subject } from "./subject.model";

export class Topic{
    id!: number;
    topicName!:string;
    subject!:Subject;
    stream?:Stream;
    createdBy?:number;
    ModifiedBy?:number;
}