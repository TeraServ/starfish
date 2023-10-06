import { CHBody } from "./chbody.model";
import { Page } from "./page.model";

export class Chapter{
    id!:number
    chapterName!:string;
    courseId!:number;
    bodies!:CHBody[];
}
