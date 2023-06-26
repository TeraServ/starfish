import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { StreamService } from '../services/stream.service';
import { Stream } from '../models/stream.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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



  constructor(private formBuilder: FormBuilder, private streamService: StreamService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.createStreamForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      acronym: ['',[Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],

    });
    this.getStreams();
  }

  //creating stream
  createStream(){
    this.stream.streamStatus = 1;
    this.streamService.createStream(this.stream).subscribe({
      next: (data: any)=>{        
        this.snackBar.open("Successfully created.", '', {
          duration: 3000
        })
        
      },
      error: (e:any) => console.error(e)
    });
    
    

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
    }
    else{
      return;
    }
    this.createStreamForm.reset();
    this.createStreamForm.clearValidators();
    this.submitted = false;
  }









    /* The `onSubmit()` function is a method that is called when the user submits the job registration
    form. It first sets the value of the `notification` field in the form to an object containing
    information about the job registration. Then, it sets the `submitted` flag to true and checks if the
    form is valid. If the form is valid, it calls the `createJob()` method of the `jobService` to create
    a new job with the form data. If the job is created successfully, it displays a success message
    using the `openSnackBar()` method and resets the form. If there is an error, it does nothing. */
   
    



 
}