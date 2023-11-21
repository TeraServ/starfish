export enum QuestionType {
    singleAnswer = 'singleAnswer',
    MultipleChoiceSingleAnswer = 'multipleChoice',
    MultipleChoiceMultipleAnswer = 'multipleSelect',
    TrueOrFalse = 'trueOrFalse'
}

export enum MaximumQuestionMark {
    singleAnswer = 1,
    MultipleChoiceSingleAnswer = 2,
    MultipleChoiceMultipleAnswer = 3,
    TrueOrFalse = 1
}

export enum NegativeQuestionMark {
    singleAnswer = -0.25,
    MultipleChoiceSingleAnswer = -0.5,
    MultipleChoiceMultipleAnswer = 0,
    TrueOrFalse = -0.25
}

export enum MinimumQuestionOptions {
    MultipleChoiceSingleAnswer = 2,
    MultipleChoiceMultipleAnswer = 2

}

export enum MaximumOptionCharacter {
    MultipleChoiceSingleAnswer = 100,
    MultipleChoiceMultipleAnswer = 99
}

export enum MaximumOptionSelection {

    singleAnswer = 0,
    MultipleChoiceSingleAnswer = 1,
    // MultipleChoiceMultipleAnswer = 1
}

export enum QuestionMessageBox{
    addNewMCQOption = 'MCQ Option Added',
    addNewMSQOption = 'MSQ Option Added',
    removeMCQOption = 'MCQ Option Removed',
    removeMSQOption = 'MSQ Option Removed',
    oneCorrectMCQOption = 'MCQ should have one correct answer',
    oneCorrectMSQOption = 'Minimum one correct should be checked.',
    noQuestionPreview = 'No Question to Preview',
    questionAdded = 'Successfully Created',
}




export function getQuestionTypeArray(): Array<string> {
    return Object.keys(QuestionType).filter(key => isNaN(+key));
}

export function getMaximumQuestionMarkArray(): Array<string> {
    return Object.keys(MaximumQuestionMark).filter(key => isNaN(+key));
}
