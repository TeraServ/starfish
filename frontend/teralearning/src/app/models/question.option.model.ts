import { MaximumQuestionMark, NegativeQuestionMark } from "./questionDetailEnum";

export interface QuestionOption {
    id?:number;
    optionId?: number;
    text?: DisplayText;
    correct?: boolean;
    value?: Mark;
    answer?: Answers;
    selected?: boolean;
    disabled?: boolean;
    styleClass?: string
}

type DisplayText = string | number;
type Mark = MaximumQuestionMark | NegativeQuestionMark;
type Answers = string | number | string [];
