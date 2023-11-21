import { Question } from "src/app/models/question.model";
import { quiz } from "./quiz.model";
import { Topic } from "./topic.model";

export interface DialogData {
    id: number ;
    message: string;
    username: string;
    funId:number;
    deleteItem:any,
    innerHTMLContent?:string;
  }
  export type DeleteableItem = Topic| quiz | Question 
  