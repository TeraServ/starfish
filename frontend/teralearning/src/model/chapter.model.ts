import { Page } from "./page.model";

export class Chapter{
    id!:number
    chapterName!:string;
    pages!:Page[];
    courseId!:number
}
