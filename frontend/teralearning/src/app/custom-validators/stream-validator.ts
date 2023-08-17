import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class StreamValidator{

    static acronym (validAcronymList:string[]):ValidatorFn {
        return (control: AbstractControl):{[key:string]: boolean} | null =>{
            return validAcronymList.some(acronym => (acronym == control.value.trim())) ? null :{'StreamAcronymNotAllowed':true};
        }
    }

    static price(): ValidatorFn {
        return (control: AbstractControl) : ValidationErrors | null => {
            if(control.value <= 0){
                return {
                    'PriceInvalid':true
                };
            } 
            return null;
        }
    }

    static discount():ValidatorFn{
        return (control: AbstractControl) : ValidationErrors | null =>{
            if(control.value > 0 && control.value <= 100){
                return null;
            }
            return {
                'DiscountInvalid': true
            };}
    }
    

}