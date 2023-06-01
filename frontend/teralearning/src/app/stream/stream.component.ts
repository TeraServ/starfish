import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  createStreamForm!: FormGroup;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createStreamForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      Acronymn: ['',[Validators.required]],
      price: ['', [Validators.required]],
      discounts: ['', [Validators.required]],

    });
  }
  onSubmit() {
    this.submitted = true;
  }









    /* The `onSubmit()` function is a method that is called when the user submits the job registration
    form. It first sets the value of the `notification` field in the form to an object containing
    information about the job registration. Then, it sets the `submitted` flag to true and checks if the
    form is valid. If the form is valid, it calls the `createJob()` method of the `jobService` to create
    a new job with the form data. If the job is created successfully, it displays a success message
    using the `openSnackBar()` method and resets the form. If there is an error, it does nothing. */
   
    



 
}