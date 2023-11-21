import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuizService } from 'src/app/service/quiz.service';
import { DeleteableItem, DialogData } from 'src/model/dialog.model';
import { DeleteMessageDialogComponent } from '../delete-message-dialog/delete-message-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { QuestionService } from 'src/app/service/question.service';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/service/topic.service';

import { Question } from 'src/app/models/question.model';
import { Topic } from 'src/model/topic.model';
import { quiz } from 'src/model/quiz.model';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';



@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  message!: string
  funId!: number
  showWarnMessage: boolean = false;
  warnMessage!: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private quizService: QuizService, private questionService: QuestionService, private router: Router, private topicService: TopicService) { }

  ngOnInit(): void {

    // this.setDeleteMessage(this.data.funId);
    // this.deleteItem = this.data.delet
    console.log("Item for Deleting:",this.data.deleteItem);
    const isQuiz = 'quizName' in this.data.deleteItem ;
    const isQuiz2 =  this.data.deleteItem instanceof quiz ;
    console.log("Item for Deleting:",isQuiz,isQuiz2);

  }
  // setDeleteMessage<T>(item:T):string{
  //   if(item instanceof quiz){
  //      return `${item.quizName} was deleted.` ;
  //   }
  //   else if(typeof item == 'Question')
  //   return '';

  // }
isQuiz(delteItem:DeleteableItem):boolean{
  return 'quizName' in delteItem;
}
isQuestion(delteItem:DeleteableItem):boolean{
  return 'questionType' in delteItem && 'questionText' in delteItem;
}
isTopic(delteItem:DeleteableItem):boolean{
  return 'topicName' in delteItem;
}




  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(qn: number, deleteItem: any ) {
    
    if (qn == 1) {
      this.quizService.deleteQuiz(this.data.id).subscribe({
        next: (data: any) => {
          // this.dialog.open(DeleteMessageDialogComponent, { data: { header: "Successfully Deleted", message: `${deleteItem.quizName} was deleted.` } })
          // this.dialogRef.close();
        },
        error: (e: any) => {
          if(e.status == 200){
            this.dialog.open(SuccessDialogComponent, { data: { header: "Successfully Deleted", message: `${deleteItem.quizName} was deleted.` } })
          this.dialogRef.close();

          }

        
          else if (e.status == 500) {
            //window.confirm("Cannot Delete Quiz: As Quiz is mapped to a Course")
            this.warnMessage = "Cannot delete quiz as it is mapped to courses";
            this.showWarnMessage = true;
          }
          console.error(e)
        }
      });
    }
    else if (qn == 2 ) {
      this.questionService.deleteQuestion(this.data.id).subscribe({
        next: (data: any) => {
          this.dialogRef.close();
          this.dialog.open(DeleteMessageDialogComponent, { data: { message: "Successfully deleted Question" } })
          
        },
        error: (e: any) => {
          console.error(e)
          if (e.status == 200) {
            this.dialogRef.close();
            this.dialog.open(SuccessDialogComponent, { data: { header: "Successfully Deleted" , innerHTMLContent: `${deleteItem.questionText} was deleted.` } }).afterClosed().subscribe(data => {
             
            });
          }
          else if (e.status == 500) {
            this.warnMessage = "Cannot delete question as it is mapped to quiz";
            this.showWarnMessage = true;
          }
        }
      });


    }

    else if (qn == 3) {
      this.topicService.deleteTopic(this.data.id).subscribe({
        next: (data: Topic) => {
          console.log("qn == 3:", data)
        },
        error: (e: any) => {
          console.error(e)
          if (e.status == 200) {

            this.dialog.open(SuccessDialogComponent, { data: { header: `Successfully Deleted`, message: `${deleteItem.topicName} was deleted.` } })
            this.dialogRef.close();
          }
          else if (e.status == 409) {
            this.warnMessage = "Cannot delete topic as it is mapped";
            this.showWarnMessage = true;
          }
        }
      });


    }


  }

 
}
