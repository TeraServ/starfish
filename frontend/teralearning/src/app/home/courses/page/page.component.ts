import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseDataService } from 'src/app/service/course-data.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder,private courseDataService:CourseDataService,private matDialogRef:MatDialogRef<PageComponent>) { }

  pageForm!:FormGroup;
  ngOnInit(): void {
    this.pageForm = this.formBuilder.group({
      id:[0],
      title:['',Validators.required],
      body:['',Validators.required],
      readTime:[60]
    })
    if(this.data != null){
      console.log(this.data)
      this.pageForm.get("id")?.setValue(this.data.id);
      this.pageForm.get("title")?.setValue(this.data.title);
      this.pageForm.get("body")?.setValue(this.data.body);
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '16rem',
      minHeight: '5rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { return this.uploadFile() },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

addPage(){
 
  if(this.pageForm.invalid){
    return;
  }else{
    
    this.matDialogRef.close({data:this.pageForm.value})
  }
}
}
