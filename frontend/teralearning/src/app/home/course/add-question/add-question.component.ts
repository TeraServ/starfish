import { QuestionOption } from 'src/app/models/question.option.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,  FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularRichTextEditorValidator } from 'src/app/custom-validators/angular-rich-text-editor-validator';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import {QuestionType, MaximumQuestionMark, MinimumQuestionOptions, NegativeQuestionMark, MaximumOptionCharacter, MaximumOptionSelection} from 'src/app/models/questionDetailEnum';
import { Question } from 'src/app/models/question.model';
import { RichTextEditorService } from 'src/app/service/rich-text-editor.service';
import { SnackbarNotificationService } from 'src/app/service/snackbar-notification.service';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';
  
interface QuestionTypeDropDown{
  value: string;
  viewValue: string;
}

export const LABELS = {
  pageTitle: 'Add a Question',
  questionType:'Question Type',
  questionTitle: 'Question',
  answerTitle: 'Answer',
  mcqTitle: 'Add an Option',
  msqTitle:'Add Options',
  answerExplanationLabel: 'Answer Explanation'
};
export const ARIA_LABEL = {
  matRadioButton: 'This button '
}

export const PLACEHOLDERS = {
  questionTextPlaceholder: 'Compose a Question',
  answerTextPlaceholder: 'Answer',
  mcqOptionPlaceholder: 'Option Answer',
  answerExplanationPlaceholder: 'Write an Answer Explanation'
};

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  providers:[RichTextEditorService]
})
export class AddQuestionComponent implements OnInit {

  public readonly labels = LABELS;
  public readonly placeholders = PLACEHOLDERS;
  defaultQuestionType!:string;
  questionTypes!: QuestionTypeDropDown[];
  addQuestionForm!:FormGroup;
  isSingleAnswerType!:boolean;
  isMultipleChoiceType!:boolean; 
  isMultipleSelectType!:boolean; 
  hasMultipleChoice:boolean[] = new Array<boolean>(2);
  selectedMCQOption!:number;
  isSubmitted!:boolean;
  newQuestion!: Question | undefined;
  quizId!:number;
  editorConfig!: AngularEditorConfig;

  constructor(
    private formBuilder:FormBuilder,
    public _snackbar: SnackbarNotificationService,
    public _editor:RichTextEditorService,
    private _authService: AuthService,
    private _questionService : QuestionService,
    public dialogRef: MatDialogRef<AddQuestionComponent>) { }

  ngOnInit(): void {
    this.resetForm()
    this.buildQuestionForm();
    this.onQuestionTypeChange();
  
  }

  resetForm(){
    this.isSingleAnswerType = false;
    this.isMultipleChoiceType = false;
    this.isMultipleSelectType = false;
    this.hasMultipleChoice.fill(false);
    this.isSubmitted = false;
    this.defaultQuestionType = QuestionType.singleAnswer;
    this.quizId = 33;
    this.editorConfig = this._editor.editorConfig('');
    this.questionTypes = [
      {value: QuestionType.singleAnswer, viewValue: 'Single Answer'},
      {value: QuestionType.MultipleChoiceSingleAnswer, viewValue: 'Multiple Choice'},
      {value: QuestionType.MultipleChoiceMultipleAnswer, viewValue: 'Multiple Select'},
    ];
   
  }

  buildQuestionForm(){
    this.addQuestionForm = this.formBuilder.group({
      questionType:[this.defaultQuestionType,Validators.required],
      questionText:['',AngularRichTextEditorValidator.required],
      answer: ['',AngularRichTextEditorValidator.required],
      mcqOptions: this.formBuilder.array([]),
      msqOptions: this.formBuilder.array([]),
      answerExplanation: ['',AngularRichTextEditorValidator.required()]
    })
  }

  get mcqOptions(): FormArray {
    return this.addQuestionForm.get('mcqOptions') as FormArray;
  }
  get msqOptions() {
    return this.addQuestionForm.get('msqOptions') as FormArray;
  }

  onQuestionTypeChange(){
    const questionType:string = this.addQuestionForm.get('questionType')?.value;
    switch(questionType){
      case this.questionTypes[0].value:
        this.isSingleAnswerType = true;
        this.isMultipleChoiceType = false;
        this.isMultipleSelectType = false;
        this.hasMultipleChoice.fill(false);
        this.isSubmitted = false;
        this.mcqOptions.clear();
        break;
      case this.questionTypes[1].value:
        this.isMultipleChoiceType = true;
        this.isSingleAnswerType = false;
        this.isMultipleSelectType = false;
        this.hasMultipleChoice[0] = true;
        this.hasMultipleChoice[1] = false;
        this.isSubmitted = false;
        this.msqOptions.clear()
        break;
      case this.questionTypes[2].value:
        this.isMultipleSelectType = true; 
        this.isMultipleChoiceType = false;
        this.isSingleAnswerType = false;
        this.hasMultipleChoice[0] = false;
        this.hasMultipleChoice[1] = true;
        this.isSubmitted = false;
        this.mcqOptions.clear();
        break;
      default:
        this.resetForm();
        break;
    }
  }
 

  createNewMCQOption(){
    const newMCQOption = this.formBuilder.group({
      optionText:['',Validators.maxLength(MaximumOptionCharacter.MultipleChoiceSingleAnswer)] ,
      isAnswer:[false]
    });
    this.mcqOptions.push(newMCQOption);
  }

  addNewMCQOption(){
    this.hasMultipleChoice[0] = true;
    if(this.mcqOptions.length == 0){
    for(let i = 0; i <  MinimumQuestionOptions.MultipleChoiceSingleAnswer; i++){
      this.createNewMCQOption();
    }}
    else{
      this.createNewMCQOption();
    }
    this._snackbar.success('MCQ Option Added');
  }
  getCurrentMCQOption(index:number){
    return this.mcqOptions.at(index);
  }

  getMCQOptionText(selectedIndex:number):string {
    return this.getCurrentMCQOption(selectedIndex).get('optionText')?.value;
  }

  radioButtonChange(mrChange: MatRadioChange,selectedIndex: number){
    // let mrButton: MatRadioButton = mrChange.source;
    // console.log(mrButton.checked);
    const currentOption = this.getCurrentMCQOption(selectedIndex);
    currentOption.get('isAnswer')?.setValue(true);
    this.handleMCQFieldChange(selectedIndex);
  }


  handleMCQFieldChange(selectedIndex:number){
 
    if(this.mcqOptions.length < MinimumQuestionOptions.MultipleChoiceSingleAnswer){
      this.addNewMCQOption();
    }else{
    const currentOption = this.getCurrentMCQOption(selectedIndex);
    if(currentOption.get('isAnswer')?.value){
      this.mcqOptions.controls.forEach((control,i)=>
      {
        if(i != selectedIndex){
          control.get('isAnswer')?.setValue(false);}
      });
    }else{
      // this._snackbar.warning('Click the correct option');
      const isAtLeastOneTrue = this.mcqOptions.controls.some(control => control.get('isAnswer')?.value);
      if(!isAtLeastOneTrue){
        this._snackbar.warning('MCQ should have one correct answer');
        currentOption.get('isAnswer')?.setValue(true);
      }
    }
    }}
  
  removeMCQOption(index:number){
    this.mcqOptions.removeAt(index);
    this._snackbar.warning('MCQ Option Removed');
  }

  createNewMSQOption(){
    const newMSQOption = this.formBuilder.group({
      optionText:['',Validators.maxLength(MaximumOptionCharacter.MultipleChoiceMultipleAnswer)],
      isAnswer:[false]
    })
    this.msqOptions.push(newMSQOption);
  }
  
  addNewMSQOption(){
    this.hasMultipleChoice[1] = true;
    if(this.msqOptions.length == 0){
      for(let i = 0; i <  MinimumQuestionOptions.MultipleChoiceMultipleAnswer; i++){
        this.createNewMSQOption();
      }
    }else{
      this.createNewMSQOption();
    }
    this._snackbar.success('MSQ Option Added');
  }

  handleMSQCheckboxChange(index: number){
    if(this.msqOptions.length < MinimumQuestionOptions.MultipleChoiceMultipleAnswer){
      this.addNewMSQOption();
    }else{
      const currentOption = this.msqOptions.at(index);
      const isAtLeastOneTrue = this.msqOptions.controls.some(control => control.get('isAnswer')?.value);
      const isAtLeastOneFalse = this.msqOptions.controls.some(control => !control.get('isAnswer')?.value);
      if(isAtLeastOneTrue && isAtLeastOneFalse){}
      else{
        this._snackbar.warning('Minimum one correct and wrong answer should be checked.')
        currentOption.get('isAnswer')?.setValue(!(currentOption.get('isAnswer')?.value));
      }
    }
  }
  
  removeMSQOption(index:any){
    this.msqOptions.removeAt(index);
    this._snackbar.warning('MSQ Option Removed');
  }

  getAnswers():any{
    if(this.isMultipleChoiceType){
      return this.mcqOptions.value;
    }
    if(this.isMultipleSelectType){
    return this.msqOptions.value;
    }
    else{
      this.mcqOptions.clear();
      this.msqOptions.clear();
      return this.addQuestionForm.get('answer');
    }
  }
  
  onSubmit(){
    this.onPreview();
    if(![this.addQuestionForm.get('questionText')?.valid &&  this.addQuestionForm.get('answerExplanation')?.valid && (this.hasMultipleChoice[0] || this.hasMultipleChoice[1] ? (this.mcqOptions.valid || this.msqOptions.valid) : this.addQuestionForm.get('answer')?.valid )]){
      this._snackbar.warning('All fields and required');
    }
    else{
    const questionType:string = this.addQuestionForm.get('questionType')?.value;
    switch(questionType){
      case this.questionTypes[0].value:
        console.log('New Question Type:',questionType);
        let singleAnswer: QuestionOption = {
          correct:true,
          value: MaximumQuestionMark.singleAnswer,
          answer:this.getAnswers()
        }
        let newSingleAnswerQuestion: Question = {
          quizId:this.quizId,
          type: QuestionType.singleAnswer,
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers:[singleAnswer],
          explanation: this.addQuestionForm.get('answerExplanation')?.value,
          maxSelection:MaximumOptionSelection.singleAnswer,
          creator: this._authService.getUserEmail()
        }
        this.newQuestion = newSingleAnswerQuestion;
        console.log('New Question:',newSingleAnswerQuestion);
        this._questionService.createNewQuestion(newSingleAnswerQuestion).subscribe(data=>{
          console.log("Data Send:",data);
        },err=>{
          console.log("Error:",err);
        })
        break;
        
      case this.questionTypes[1].value:
        let mcqAnswers: QuestionOption[] = [];
        this.mcqOptions.controls.forEach((control,index)=>{
          let mcqAnswer:QuestionOption = {
            optionId:(index+1),
            correct:control.get('isAnswer')?.value,
            value:(control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceSingleAnswer : NegativeQuestionMark.MultipleChoiceSingleAnswer,
            answer: control.get('optionText')?.value,
          }
          mcqAnswers.push(mcqAnswer);
        });
        let newMCQQuestion: Question = {
          quizId:this.quizId,
          type: QuestionType.MultipleChoiceSingleAnswer,
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers: mcqAnswers,
          explanation: this.addQuestionForm.get('answerExplanation')?.value,
          maxSelection: MaximumOptionSelection.MultipleChoiceSingleAnswer,
          creator: this._authService.getUserEmail()
        }
        this.newQuestion = newMCQQuestion;
        console.log('New Question:',newMCQQuestion);
        break;

      case this.questionTypes[2].value:
        let msqAnswers: QuestionOption[] = [];
        this.msqOptions.controls.forEach((control,index)=>{
          let msqAnswer:QuestionOption = {
            optionId:(index+1),
            correct:control.get('isAnswer')?.value,
            value: (control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceMultipleAnswer : NegativeQuestionMark.MultipleChoiceMultipleAnswer,
            answer: control.get('optionText')?.value,
          };
          msqAnswers.push(msqAnswer);
        });
        let newMSQQuestion: Question = {
          quizId:this.quizId,
          type: QuestionType.MultipleChoiceMultipleAnswer,
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers:msqAnswers,
          explanation:this.addQuestionForm.get('answerExplanation')?.value,
          maxSelection: (msqAnswers.length -1),
          creator: this._authService.getUserEmail()
        };
        this.newQuestion = newMSQQuestion;
        console.log('New Question:',newMSQQuestion);
        break;

      default:
        this._snackbar.warning('Form is invalid. Please fill in all required fields')
        this.resetForm();
        break;
    }}
  }

  onPreview(){
    this.isSubmitted = true;
  }
  onBack(){
    this.isSubmitted = false;
  }
  onSave(){
    if(this.isSubmitted){
      console.log(this.newQuestion);
    }
  }
  onSaveConfirmation(confirmation:any){
    console.log('Save the question:',confirmation);
  }


  onClose(){
    this.resetForm();
    this.dialogRef.close();
  }
  
}
