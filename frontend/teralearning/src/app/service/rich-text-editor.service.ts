import { Injectable } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Injectable({
  providedIn: 'root'
})
export class RichTextEditorService {

  constructor() {
   }
  // private  defaultFont:string = 'Arial'

  editorConfig(placeholderMessage:string, defaultFont?:string):AngularEditorConfig {
  defaultFont = defaultFont ? defaultFont : 'Arial' ;
  const config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize:false,
    height: 'auto',
    minHeight: '5rem',
    enableToolbar: true,
    showToolbar: true,
    placeholder: placeholderMessage,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: defaultFont,
    defaultFontSize: '',
    toolbarHiddenButtons: [
      ['bold']
      ],
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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
  return config;
  }


}
