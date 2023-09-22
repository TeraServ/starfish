import { Question } from './../../../models/question.model';
import { QuestionOption } from 'src/app/models/question.option.model';
import { Component, OnInit, Input, Optional, Inject } from '@angular/core';

import { FormArray, FormBuilder,  FormGroup, NgControlStatus, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularRichTextEditorValidator } from 'src/app/custom-validators/angular-rich-text-editor-validator';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import {QuestionType, MaximumQuestionMark, MinimumQuestionOptions, NegativeQuestionMark, MaximumOptionCharacter, MaximumOptionSelection, QuestionMessageBox} from 'src/app/models/questionDetailEnum';
import { RichTextEditorService } from 'src/app/service/rich-text-editor.service';
import { SnackbarNotificationService } from 'src/app/service/snackbar-notification.service';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { quiz } from 'src/model/quiz.model';


  
interface QuestionTypeDropDown{
  value: string;
  viewValue: string;
}

export const LABELS = {
  pageTitle: 'Add a Question',
  questionType:'Question Type',
  questionTitle: 'Question',
  answerTitle: 'Answer',
  mcqTitle: 'Add Options',
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
  
  @Input() currentQuiz!: quiz;
  @Input() topic:any = {};
  

  public readonly labels = LABELS;
  public readonly placeholders = PLACEHOLDERS;
  defaultQuestionType!:string;
  questionTypes!: QuestionTypeDropDown[];
  addQuestionForm!:FormGroup;
  isSingleAnswerType!:boolean;
  isMultipleChoiceType!:boolean; 
  isMultipleSelectType!:boolean; 
  hasMultipleChoice:boolean[] = new Array<boolean>(2);
  isPreviewed:boolean=false;
  newQuestion!: any;
  editorConfig!: AngularEditorConfig;

  constructor(
    private formBuilder:FormBuilder,
    public _snackbar: SnackbarNotificationService,
    public _editor:RichTextEditorService,
    private _authService: AuthService,
    private _questionService : QuestionService,
    private _dialog: MatDialog,
    private _router: Router,  
    public dialogRef: MatDialogRef<AddQuestionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: quiz
    ) {
      this.currentQuiz = data;
      console.log("Current Quiz:",this.currentQuiz)
     }

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
    this.isPreviewed = false;
    this.defaultQuestionType = QuestionType.singleAnswer;
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
    });   
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
        this.isPreviewed = false;
        this.mcqOptions.clear();
        this.msqOptions.clear();
        this.msqOptions.clear();
        break;
      case this.questionTypes[1].value:
        this.isMultipleChoiceType = true;
        this.isSingleAnswerType = false;
        this.isMultipleSelectType = false;
        this.hasMultipleChoice[0] = true;
        this.hasMultipleChoice[1] = false;
        this.isPreviewed = false;
        this.msqOptions.clear()
        break;
      case this.questionTypes[2].value:
        this.isMultipleSelectType = true; 
        this.isMultipleChoiceType = false;
        this.isSingleAnswerType = false;
        this.hasMultipleChoice[0] = false;
        this.hasMultipleChoice[1] = true;
        this.isPreviewed = false;
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
    this._snackbar.success(QuestionMessageBox.addNewMCQOption);
    this._snackbar.success(QuestionMessageBox.addNewMCQOption);
  }
  getCurrentMCQOption(index:number){
    return this.mcqOptions.at(index);
  }

  radioButtonChange(mrChange: MatRadioChange,selectedIndex: number){
    let mrButton: MatRadioButton = mrChange.source;
    mrButton.checked = true;
    const currentOption = this.getCurrentMCQOption(selectedIndex);
    currentOption.get('isAnswer')?.setValue(true);
    this.handleMCQFieldChange(selectedIndex);
  }

  checkMinimumMCQOptionCount(){
    if(this.mcqOptions.length < MinimumQuestionOptions.MultipleChoiceSingleAnswer){
      this.addNewMCQOption();
    }
  }

  handleMCQFieldChange(selectedIndex:number){
    this.checkMinimumMCQOptionCount();
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
        this._snackbar.warning(QuestionMessageBox.oneCorrectMCQOption);
        this._snackbar.warning(QuestionMessageBox.oneCorrectMCQOption);
        currentOption.get('isAnswer')?.setValue(true);
      }
    }
    }
  
  removeMCQOption(index:number){
    this.mcqOptions.removeAt(index);
    this._snackbar.warning(QuestionMessageBox.removeMCQOption);
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
    this._snackbar.success(QuestionMessageBox.addNewMSQOption);
    this._snackbar.success(QuestionMessageBox.addNewMSQOption);
  }

  handleMSQCheckboxChange(index: number){
    if(this.msqOptions.length < MinimumQuestionOptions.MultipleChoiceMultipleAnswer){
      this.addNewMSQOption();
    }else{
      const currentOption = this.msqOptions.at(index);
      const isAtLeastOneTrue = this.msqOptions.controls.some(control => control.get('isAnswer')?.value);
      // const isAtLeastOneFalse = this.msqOptions.controls.some(control => !control.get('isAnswer')?.value);
      if(isAtLeastOneTrue){}
      else{
        this._snackbar.warning(QuestionMessageBox.oneCorrectMSQOption);
        this._snackbar.warning(QuestionMessageBox.oneCorrectMSQOption);
        currentOption.get('isAnswer')?.setValue(!(currentOption.get('isAnswer')?.value));
      }
    }
  }
  
  removeMSQOption(index:any){
    this.msqOptions.removeAt(index);
    this._snackbar.warning(QuestionMessageBox.removeMSQOption);
    this._snackbar.warning(QuestionMessageBox.removeMSQOption);
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
          id:0,
          optionId:1,
          text:this.addQuestionForm.get('answer')?.value,          
          correct:true,
          value: MaximumQuestionMark.singleAnswer,
          answer:'',
          disabled: false,
          ownerEmail:this._authService.getCurrentUserEmail(),
          modifierEmail: this._authService.getCurrentUserEmail(),
          createdDate:'',
          modifiedDate:'',
        }
        let newSingleAnswerQuestion: Question = {
          id:0,
          questionType: QuestionType.singleAnswer,
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers:[singleAnswer],
          explanation: this.addQuestionForm.get('answerExplanation')?.value,
          maximumSelectionAllowed:MaximumOptionSelection.singleAnswer,
          quiz: this.currentQuiz,
          creator: parseInt(this._authService.getCurrentUserDetails().id),
          modifier:parseInt(this._authService.getCurrentUserDetails().id),
          createdDate:'',
          modifiedDate:''
        }
        this.newQuestion = newSingleAnswerQuestion;
        console.log('New Question:',newSingleAnswerQuestion);
        break;
        
      case this.questionTypes[1].value:
        let mcqAnswers: QuestionOption[] = [];
        this.mcqOptions.controls.forEach((control,index)=>{
          let mcqAnswer:QuestionOption = {
            id:0,           
            optionId:(index+1),
            text:control.get('optionText')?.value,           
            correct:control.get('isAnswer')?.value,
            value:(control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceSingleAnswer : NegativeQuestionMark.MultipleChoiceSingleAnswer,
            answer: control.get('optionText')?.value,
            disabled: false,
            ownerEmail:this._authService.getCurrentUserEmail(),
            modifierEmail: this._authService.getCurrentUserEmail(),
            createdDate:'',
            modifiedDate:'',
          }
          mcqAnswers.push(mcqAnswer);
        });
        let newMCQQuestion: Question = {
          id:0,
          questionType: QuestionType.MultipleChoiceSingleAnswer,          
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers: mcqAnswers,
          explanation: this.addQuestionForm.get('answerExplanation')?.value,
          maximumSelectionAllowed: MaximumOptionSelection.MultipleChoiceSingleAnswer,
          quiz: this.currentQuiz,
          creator: this._authService.getCurrentUserDetails().id,
          modifier:this._authService.getCurrentUserDetails().id,
          createdDate:'',
          modifiedDate:'',
        }
        this.newQuestion = newMCQQuestion;
        console.log('New Question:',newMCQQuestion);
        break;

      case this.questionTypes[2].value:
        let msqAnswers: QuestionOption[] = [];
        this.msqOptions.controls.forEach((control,index)=>{
          let msqAnswer:QuestionOption = {
            id:0,            
            optionId:(index+1),
            text:control.get('optionText')?.value,            
            correct:control.get('isAnswer')?.value,
            value: (control.get('isAnswer')?.value) ? MaximumQuestionMark.MultipleChoiceMultipleAnswer : NegativeQuestionMark.MultipleChoiceMultipleAnswer,
            answer: control.get('optionText')?.value,
            disabled: false,
            ownerEmail:this._authService.getCurrentUserEmail(),
            modifierEmail: this._authService.getCurrentUserEmail(),
            createdDate:'',
            modifiedDate:'',
          };
          msqAnswers.push(msqAnswer);
        });
        let newMSQQuestion: Question = {
          id:0,
          questionType: QuestionType.MultipleChoiceMultipleAnswer,          
          questionText: this.addQuestionForm.get('questionText')?.value,
          answers:msqAnswers,
          explanation:this.addQuestionForm.get('answerExplanation')?.value,
          maximumSelectionAllowed: (msqAnswers.length),
          quiz: this.currentQuiz,
          creator: this._authService.getCurrentUserDetails().id,
          modifier:this._authService.getCurrentUserDetails().id,
          createdDate:'',
          modifiedDate:'',
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
    if(this.addQuestionForm.get('questionText')?.value){
      this.isPreviewed = !this.isPreviewed;
    }else{
      this._snackbar.warning(QuestionMessageBox.noQuestionPreview);
    }
    // this._questionService.sendQuestion(this.newQuestion);
  }
  onBack(){
    this.isPreviewed = !this.isPreviewed;
  }
  onSave(){
    console.log(JSON.stringify(this.newQuestion));
    if(this.isPreviewed){
      this._questionService.addNewQuestion(this.newQuestion).subscribe(
        resp=>{
          console.log("Response:",resp);
          this._dialog.open(SuccessDialogComponent,{data:{message:QuestionMessageBox.questionAdded}})
          .afterClosed().subscribe(val=>{
            this.onClose();
          });
        }
      )
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