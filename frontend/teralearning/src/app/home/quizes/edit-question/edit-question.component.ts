import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularRichTextEditorValidator } from 'src/app/custom-validators/angular-rich-text-editor-validator';
import { Question } from 'src/app/models/question.model';
import { QuestionOption } from 'src/app/models/question.option.model';
import { QuestionType, MaximumOptionCharacter, MinimumQuestionOptions, MaximumQuestionMark, MaximumOptionSelection, NegativeQuestionMark } from 'src/app/models/questionDetailEnum';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { RichTextEditorService } from 'src/app/service/rich-text-editor.service';
import { SnackbarNotificationService } from 'src/app/service/snackbar-notification.service';
import { AddQuestionComponent } from '../../course/add-question/add-question.component';
import { MatIconModule } from '@angular/material/icon';
import { Quiz } from 'src/app/models/quiz.model';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { quiz } from 'src/model/quiz.model';




interface QuestionTypeDropDown {
  value: string;
  viewValue: string;
}

export const LABELS = {
  pageTitle: 'Edit Question',
  questionType: 'Question Type',
  questionTitle: 'Question',
  answerTitle: 'Answer',
  mcqTitle: 'Add Options',
  msqTitle: 'Add Options',
  answerExplanationLabel: 'Answer Explanation'
};
export const ARIA_LABEL = {
  matRadioButton: 'This button '
}

export const PLACEHOLDERS = {
  questionTextPlaceholder: 'Eg: What is an array?',
  answerTextPlaceholder: 'Eg: An array is a collection of objects of same data type',
  mcqOptionPlaceholder: 'Option',
  answerExplanationPlaceholder: 'Eg: An array in C is a fixed-size collection of similar data items stored in contiguous memory locations'
};

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],

})
export class EditQuestionComponent implements OnInit {

  @Input() editQuiz!: quiz;
  @Input() editQuestion!: Question;


  public readonly labels = LABELS;
  public readonly placeholders = PLACEHOLDERS;
  defaultQuestionType!: string;
  questionTypes!: QuestionTypeDropDown[];
  editQuestionForm!: FormGroup;
  isSingleAnswerType!: boolean;
  isMultipleChoiceType!: boolean;
  isMultipleSelectType!: boolean;
  hasMultipleChoice: boolean[] = new Array<boolean>(2);
  isSubmitted!: boolean;
  newQuestion: Question = {} as Question;
  editorConfig!: AngularEditorConfig;


  constructor(
    private formBuilder: FormBuilder,
    public _snackbar: SnackbarNotificationService,
    public _editor: RichTextEditorService,
    private _authService: AuthService,
    private _questionService: QuestionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Question, private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditQuestionComponent>) {
    this.editQuestion = data;
  }


  updatedQuestion!: string;
  updatedAnswer!: QuestionOption[];
  updatedAnswerExplanation!: string | undefined;


  ngOnInit(): void {

    this.resetForm()
    this.buildQuestionForm(this.editQuestion);
    // this.onQuestionTypeChange();
    this.displayQuestionAndAnsweer(this.editQuestion);

  }





  displayQuestionAndAnsweer(question: Question) {
    switch (question.questionType) {
      case QuestionType.singleAnswer:
        this.isSingleAnswerType = true;
        this.isMultipleChoiceType = false;
        this.isMultipleSelectType = false;
        this.hasMultipleChoice.fill(false);
        this.isSubmitted = false;
        this.editQuestionForm.get('answer')?.setValue(this.editQuestion.answers?.at(0)?.answer)
        this.mcqOptions.clear();

        break;
      case QuestionType.MultipleChoiceSingleAnswer:
        this.isMultipleChoiceType = true;
        this.isSingleAnswerType = false;
        this.isMultipleSelectType = false;
        this.hasMultipleChoice[0] = true;
        this.hasMultipleChoice[1] = false;
        this.isSubmitted = false;
        this.msqOptions.clear()
        this.loadMCQOptions()
        break;

      case QuestionType.MultipleChoiceMultipleAnswer:
        this.isMultipleSelectType = true;
        this.isMultipleChoiceType = false;
        this.isSingleAnswerType = false;
        this.hasMultipleChoice[0] = false;
        this.hasMultipleChoice[1] = true;
        this.isSubmitted = false;
        this.mcqOptions.clear();
        this.loadMSQOptions();
        break;

      default:
        this._snackbar.warning("Something went wrong");
        break;


    }
  }

  loadMCQOptions() {
    this.editQuestion.answers?.forEach(answer => {
      const newMCQOption = this.formBuilder.group({
        optionText: [answer.answer, Validators.maxLength(MaximumOptionCharacter.MultipleChoiceSingleAnswer)],
        isAnswer: [answer.correct],
        optionOwner: [answer.ownerEmail]
      });
      this.mcqOptions.push(newMCQOption);
    })

  }

  loadMSQOptions() {
    this.editQuestion.answers?.forEach(answer => {
      const newMSQOption = this.formBuilder.group({
        optionText: [answer.answer, Validators.maxLength(MaximumOptionCharacter.MultipleChoiceMultipleAnswer)],
        isAnswer: [answer.correct],
        optionOwner: [answer.ownerEmail]
      });
      this.msqOptions.push(newMSQOption);
    })
  }

  resetForm() {
    this.isSingleAnswerType = false;
    this.isMultipleChoiceType = false;
    this.isMultipleSelectType = false;
    this.hasMultipleChoice.fill(false);
    this.isSubmitted = false;
    this.defaultQuestionType = QuestionType.singleAnswer;
    this.editorConfig = this._editor.editorConfig('');
    this.questionTypes = [
      { value: QuestionType.singleAnswer, viewValue: 'Single Answer' },
      { value: QuestionType.MultipleChoiceSingleAnswer, viewValue: 'Multiple Choice' },
      { value: QuestionType.MultipleChoiceMultipleAnswer, viewValue: 'Multiple Select' },
    ];

  }

  buildQuestionForm(editQuestion: Question) {
    this.editQuestionForm = this.formBuilder.group({
      questionType: [editQuestion.questionType, Validators.required],
      questionText: [editQuestion.questionText, AngularRichTextEditorValidator.required],
      answer: ['', AngularRichTextEditorValidator.required],
      mcqOptions: this.formBuilder.array([]),
      msqOptions: this.formBuilder.array([]),
      answerExplanation: [editQuestion.explanation, AngularRichTextEditorValidator.required()]
    })
  }

  get mcqOptions(): FormArray {
    return this.editQuestionForm.get('mcqOptions') as FormArray;
  }
  get msqOptions() {
    return this.editQuestionForm.get('msqOptions') as FormArray;
  }


  createNewMCQOption() {
    const newMCQOption = this.formBuilder.group({
      optionText: ['', Validators.maxLength(MaximumOptionCharacter.MultipleChoiceSingleAnswer)],
      isAnswer: [false],
      optionOwner: this._authService.getCurrentUserEmail()
    });
    this.mcqOptions.push(newMCQOption);
  }

  addNewMCQOption() {
    this.hasMultipleChoice[0] = true;
    if (this.mcqOptions.length == 0) {
      for (let i = 0; i < MinimumQuestionOptions.MultipleChoiceSingleAnswer; i++) {
        this.createNewMCQOption();
      }
    }
    else {
      this.createNewMCQOption();
    }
    this._snackbar.success('MCQ Option Added');
  }
  getCurrentMCQOption(index: number) {
    return this.mcqOptions.at(index);
  }

  radioButtonChange(mrChange: MatRadioChange, selectedIndex: number) {
    let mrButton: MatRadioButton = mrChange.source;
    mrButton.checked = true;
    const currentOption = this.getCurrentMCQOption(selectedIndex);
    currentOption.get('isAnswer')?.setValue(true);
    this.handleMCQFieldChange(selectedIndex);
  }

  checkMinimumMCQOptionCount() {
    if (this.mcqOptions.length < MinimumQuestionOptions.MultipleChoiceSingleAnswer) {
      this.addNewMCQOption();
    }
  }

  handleMCQFieldChange(selectedIndex: number) {
    this.checkMinimumMCQOptionCount();
    const currentOption = this.getCurrentMCQOption(selectedIndex);
    if (currentOption.get('isAnswer')?.value) {
      this.mcqOptions.controls.forEach((control, i) => {
        if (i != selectedIndex) {
          control.get('isAnswer')?.setValue(false);
        }
      });
    } else {
      // this._snackbar.warning('Click the correct option');
      const isAtLeastOneTrue = this.mcqOptions.controls.some(control => control.get('isAnswer')?.value);
      if (!isAtLeastOneTrue) {
        this._snackbar.warning('MCQ should have one correct answer');
        currentOption.get('isAnswer')?.setValue(true);
      }
    }
  }

  removeMCQOption(index: number) {
    this.mcqOptions.removeAt(index);
    this._snackbar.warning('MCQ Option Removed');
  }

  createNewMSQOption() {
    const newMSQOption = this.formBuilder.group({
      optionText: ['', Validators.maxLength(MaximumOptionCharacter.MultipleChoiceMultipleAnswer)],
      isAnswer: [false],
      optionOwner:this._authService.getCurrentUserEmail()
    })
    this.msqOptions.push(newMSQOption);
  }

  addNewMSQOption() {
    this.hasMultipleChoice[1] = true;
    if (this.msqOptions.length == 0) {
      for (let i = 0; i < MinimumQuestionOptions.MultipleChoiceMultipleAnswer; i++) {
        this.createNewMSQOption();
      }
    } else {
      this.createNewMSQOption();
    }
    this._snackbar.success('MSQ Option Added');
  }

  handleMSQCheckboxChange(index: number) {
    if (this.msqOptions.length < MinimumQuestionOptions.MultipleChoiceMultipleAnswer) {
      this.addNewMSQOption();
    } else {
      const currentOption = this.msqOptions.at(index);
      const isAtLeastOneTrue = this.msqOptions.controls.some(control => control.get('isAnswer')?.value);
      // const isAtLeastOneFalse = this.msqOptions.controls.some(control => !control.get('isAnswer')?.value);
      if (isAtLeastOneTrue) { }
      else {
        this._snackbar.warning('Minimum one correct should be checked.')
        currentOption.get('isAnswer')?.setValue(!(currentOption.get('isAnswer')?.value));
      }
    }
  }

  removeMSQOption(index: any) {
    this.msqOptions.removeAt(index);
    this._snackbar.warning('MSQ Option Removed');
  }

  getAnswers(): any {
    if (this.isMultipleChoiceType) {
      return this.mcqOptions.value;
    }
    if (this.isMultipleSelectType) {
      return this.msqOptions.value;
    }
    else {
      this.mcqOptions.clear();
      this.msqOptions.clear();
      return this.editQuestionForm.get('answer');
    }
  }

  // updatedQuestionCall(){
  //   let UpdatedQuestionDetails: Question = {
  //     id: this.editQuestion.id,

  //   }

  // }
  getQuestionBody(questionType: any, answer: QuestionOption[]) {
    let UpdatedQuestionDetails: Question = {
      id: this.editQuestion.id,
      questionText: this.editQuestionForm.get('questionText')?.value,
      answers: answer,
      explanation: this.editQuestionForm.get('answerExplanation')?.value,
      questionType: questionType,
      maximumSelectionAllowed: MaximumOptionSelection.singleAnswer,
      quiz:this.editQuiz,
      creator: this._authService.getCurrentUserDetails().id,
      modifier: this._authService.getCurrentUserDetails().id,
      createdDate: '',
      modifiedDate: '',
    }
    return UpdatedQuestionDetails;

  }

  onSubmit() {
    this.onPreview();
    if (![this.editQuestionForm.get('questionText')?.valid && this.editQuestionForm.get('answerExplanation')?.valid && (this.hasMultipleChoice[0] || this.hasMultipleChoice[1] ? (this.mcqOptions.valid || this.msqOptions.valid) : this.editQuestionForm.get('answer')?.valid)]) {
      this._snackbar.warning('All fields and required');
    }
    else {
      switch (this.editQuestion.questionType) {
        case QuestionType.singleAnswer:
          let singleAnswer: QuestionOption = {
            id: 0,
            optionId: 1,
            text: this.editQuestionForm.get('answer')?.value,
            correct: true,
            value: MaximumQuestionMark.singleAnswer,
            answer: this.editQuestionForm.get('answer')?.value,
            disabled: false,
            ownerEmail: this.editQuestion.answers?.at(0)?.ownerEmail,
            modifierEmail: this._authService.getCurrentUserEmail(),
            createdDate: '',
            modifiedDate: ''
          }
          this.editQuestion = this.getQuestionBody(this.editQuestion.questionType, [singleAnswer]);
          break;
        case QuestionType.MultipleChoiceSingleAnswer:
          let mcqAnswers: QuestionOption[] = [];
          this.mcqOptions.controls.forEach((control, index) => {
            let mcqAnswer: QuestionOption = {
              id: 0,
              optionId: (index + 1),
              text: control.get('optionText')?.value,
              correct: control.get('isAnswer')?.value,
              value: (control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceSingleAnswer : NegativeQuestionMark.MultipleChoiceSingleAnswer,
              answer: control.get('optionText')?.value,
              disabled: false,
              ownerEmail: control.get('optionOwner')?.value,
              modifierEmail: this._authService.getCurrentUserEmail(),
              createdDate: '',
              modifiedDate: '',
            }
            mcqAnswers.push(mcqAnswer);
          });
          this.editQuestion = this.getQuestionBody(this.editQuestion.questionType, mcqAnswers);
          break;
        case QuestionType.MultipleChoiceMultipleAnswer:
          let msqAnswers: QuestionOption[] = [];
          this.msqOptions.controls.forEach((control, index) => {
            let msqAnswer: QuestionOption = {
              id: 0,
              optionId: (index + 1),
              text: control.get('optionText')?.value,
              correct: control.get('isAnswer')?.value,
              value: (control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceMultipleAnswer : NegativeQuestionMark.MultipleChoiceMultipleAnswer,
              answer: control.get('optionText')?.value,
              disabled: false,
              ownerEmail: control.get('optionOwner')?.value,
              modifierEmail: this._authService.getCurrentUserEmail(),
              createdDate: '',
              modifiedDate: '',
            };
            msqAnswers.push(msqAnswer);
          });
          this.editQuestion = this.getQuestionBody(this.editQuestion.questionType, msqAnswers)
          break;
        default:
          this._snackbar.warning("Something went Wrong");
      }


      this._questionService.updateQuestion(this.editQuestion).subscribe(data => {
        console.log("updated Question", data);
        this.dialog.open(SuccessDialogComponent, { data: { message: "successfully updated" } }).afterClosed().subscribe(data => {
          this.dialogRef.close();
        })

      }
      )
    }
  }

  onPreview() {
    this.isSubmitted = true;
    this._questionService.sendQuestion(this.newQuestion);
  }
  onBack() {
    this.isSubmitted = false;
  }
  onSave() {
    if (this.isSubmitted) {


      console.log(this.newQuestion);
    }
  }
  onSaveConfirmation(confirmation: any) {
    console.log('Save the question:', confirmation);
  }


  onClose() {
    this.resetForm();
    this.dialogRef.close();
  }
}

