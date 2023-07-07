import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Stream } from 'src/model/stream.model';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.scss']
})
export class CreateCoursesComponent implements OnInit {

  courseForm!: FormGroup;
  educationList: any = [];
  richEditorContent!:string;
  config: AngularEditorConfig = {
    editable:true,
    spellcheck:true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter course details...',
    translate:'no',
    defaultParagraphSeparator:'p',
    defaultFontName:'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  streamList:Stream[]=[
    {
      id: 1,
      streamName: 'Stream 1',
      price: 9.99,
      discount: 20,
      streamStatus: 1,
      acronym: 'S1',
    },
    {
      id: 2,
      streamName: 'Stream 2',
      price: 14.99,
      discount: 10,
      streamStatus: 1,
      acronym: 'S2',
    },
    {
      id: 3,
      streamName: 'Stream 3',
      price: 19.99,
      discount: 10,
      streamStatus: 1,
      acronym: 'S3',
    },
  ];
  validation_message = {
    courseName: [{ type: 'required', message: '* Course Name is required' }],
    streamName: [{ type: 'required', message: '* Stream is required' }],
    introduction: [{ type: 'required', message: 'Introduction Page is required' }],
    phone_no: [{ type: 'required', message: 'Mobile number is required' }],
  };

  validation_edumessage = {
    schoolName: [{ type: 'required', message: 'School Name is required' }],
    degree: [{ type: 'required', message: 'Degree is required' }],
    startDt: [{ type: 'required', message: 'Start Date is required' }],
  };

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: new FormControl('', [Validators.required]),
      streamName: new FormControl('',[Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone_no: new FormControl('', [Validators.required]),
      whatsapp_no: new FormControl(''),
      gender: new FormControl('MALE'),
      nationality: new FormControl(''),
      dob: new FormControl(''),
      martial_status: new FormControl('UNMARRIED'),
      bank_name: new FormControl(''),
      bank_accountno: new FormControl(''),
      bank_iban: new FormControl(''),
      swift_number: new FormControl(''),
      notes: new FormControl(''),
      educationdata: this.fb.array([]),
    });
    console.log(this.streamList);
  }
  get formControls() {
    return this.courseForm.controls;
  }

  //#region  EDUCATION DATA
  educationdata(): FormArray {
    return this.courseForm.get('educationdata') as FormArray;
  }
  neweducationdata(): FormGroup {
    return this.fb.group({
      schoolName: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      fieldofstudy: new FormControl(''),
      startDt: new FormControl('', [Validators.required]),
      endDt: new FormControl(''),
      grade: new FormControl(''),
      notes: new FormControl(''),
    });
  }
  educationcon(index:any) {
    this.educationList = this.courseForm.get('educationdata') as FormArray;
    const formGroup = this.educationList.controls[index] as FormGroup;
    return formGroup;
  }
  addeducationdata() {
    this.educationdata().push(this.neweducationdata());
  }
  removeeducationdata(i: number) {
    this.educationdata().removeAt(i);
  }
  //#endregion
  onSubmit() {
    console.log(this.courseForm.value)
  }
}
