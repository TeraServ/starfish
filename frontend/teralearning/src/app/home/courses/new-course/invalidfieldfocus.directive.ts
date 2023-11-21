import { ContentChildren, Directive, ElementRef, HostListener, QueryList} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector:'[focusInvalidField]',
})
export class InvalidFieldFocusDirective{
    @ContentChildren(NgControl) formControls!: QueryList<NgControl>;

    @HostListener('submit')
    check(formControls?: QueryList<NgControl>) {
        const controls = formControls
          ? formControls.toArray()
          : this.formControls.toArray();
    
        for (let field of controls) {
          if (field.invalid) {
            (field.valueAccessor as any)._elementRef.nativeElement.focus();
            break;
          }
        }
    }
}