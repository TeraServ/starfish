import { Page } from "src/model/page.model";
import { Quiz } from "../app/models/quiz.model";
import { Chapter } from "./chapter.model";

export class CHBody {
    id!: number;
    type!: string;
    pages!: Page | null;
    quizList!: Quiz | null;
}