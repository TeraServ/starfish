import { Component,ElementRef,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { Stream } from 'src/model/stream.model';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  createStreamForm!: FormGroup;
  submitted: boolean = false;
  streamList: Stream[] = [];
  stream: Stream = new Stream();



  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private streamService: StreamService,private snackBar: MatSnackBar,private el: ElementRef) { }

  ngOnInit(): void {
    this.buildForm();
    this.getStreams();
  }

  buildForm() {
    this.createStreamForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      acronym: ['',[Validators.required]],
      price: ['', [Validators.required,Validators.min(0)]],
      discount: ['', [Validators.required,Validators.min(0),Validators.max(100)]],

    });

  }

  //creating stream
  createStream(){
    
    this.stream.streamStatus = 1;
    this.streamService.createStream(this.stream).subscribe(data => {
      this.dialog.open(SuccessDialogComponent, { data: { message: "Stream created Successfully " } })
      this.clearValidations();
    }, err => {
      this.snackBar.open(err.error, '', { duration: 3000 })
      console.log(err)
    })           
    
  }

  //Getting list of streams
  getStreams(){
    this.streamService.getStreamList().subscribe((data:Stream[]) => {
      this.streamList = data;
      console.log(this.streamList)
    })
  }
 
  //Form submission
  onSubmit() {
   
    this.submitted = true;
    this.stream = this.createStreamForm.value

    if(this.createStreamForm.valid){
      this.createStream();
      this.clearValidations();
    }
    else{
      return;
    }
  
  }
  
  clearValidations(){
    this.createStreamForm.reset();
    this.createStreamForm.clearValidators();
    this.submitted = false;
    this.buildForm();
  }

  cancelDetails(){
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
    .afterClosed().subscribe(rxdData => {
      if (rxdData.shouldClearForm) {
       this.clearValidations();
      }
    });
  }
 






    /* The `onSubmit()` function is a method that is called when the user submits the job registration
    form. It first sets the value of the `notification` field in the form to an object containing
    information about the job registration. Then, it sets the `submitted` flag to true and checks if the
    form is valid. If the form is valid, it calls the `createJob()` method of the `jobService` to create
    a new job with the form data. If the job is created successfully, it displays a success message
    using the `openSnackBar()` method and resets the form. If there is an error, it does nothing. */
   
    



 
}