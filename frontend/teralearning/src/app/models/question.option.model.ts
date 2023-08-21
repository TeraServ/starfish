export interface QuestionOption {
    id?:number;
    optionId?: number;
    text?: string;
    correct?: boolean;
    value?: number;
    answer?: Answers;
    selected?: boolean;
    disabled?: boolean;
    styleClass?: string
}
type Answers = string | number | string [];
