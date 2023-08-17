import {AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '../service/user.service';


export function userExitsValidator(user: UserService): AsyncValidatorFn{
    return (control:AbstractControl) => {
        return user.findUserByEmail(control.value).subscribe(
            (response:any)=> {console.log(response), (err:any) =>{
                if(err.status == 202){
                    return err.error = true ? null : {'InvalidUser':true};
                }
            }}
        )
    }

}
