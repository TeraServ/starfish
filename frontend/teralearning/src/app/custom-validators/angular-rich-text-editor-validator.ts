import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
export class AngularRichTextEditorValidator{

    static required(): ValidatorFn{
        return (control: AbstractControl) : ValidationErrors | null =>{
            const initialHtmlPattern = /<font face="Arial"><br><\/font>/;
            const isRichTextEditorBlank = initialHtmlPattern.test(control.value);
            return isRichTextEditorBlank ? null : {'initialHtmlPattern':false}; 
        }
        
    }
    
}
