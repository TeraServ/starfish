import { AfterViewInit, ContentChildren, Directive, ElementRef, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appShowFocus]'
})
export class ShowFocusDirective{

  @ContentChildren(FormControl, { descendants: true, read: ElementRef })
  inputFields!: QueryList<ElementRef>;

  @ContentChildren(FormControl, { descendants: true })
  controls!: QueryList<FormControl>;


  constructor(private elementRef: ElementRef, private _formGroup: FormGroup ) { }

  @HostListener('ngSubmit')
  onSubmit(){
    if(this._formGroup.valid){
      return;
    }
    // this._formGroup.controls.markAllAsTouched();
    for( let i=0; i< this.controls.length;i++ ){
      if(this.controls.get(i)?.errors){
        this.inputFields.get(i)?.nativeElement.focus();
        break;
      }
    }

  }

}
