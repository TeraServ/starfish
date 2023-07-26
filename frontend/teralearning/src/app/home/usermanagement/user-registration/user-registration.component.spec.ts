import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeModule } from '../../home.module';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { user } from 'src/model/user.model';
import { stream } from 'xlsx';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule,HomeModule,MatDialogModule],
      providers : [{
        provide : MAT_DIALOG_DATA,
        useValue : {
          firstName:"Alan",
          lastName:"R S",
          stream:{streamName:"Computer"},
          userStatus:101,
          userType:101
          

        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Reactive Form Validation - FirstName check',()=>{
    let firstName = component.userForm.controls['firstName']

    expect(firstName.valid).toBeFalsy()
    expect(firstName.errors?.required).toBeTruthy()
    
  })

  it('Reactive Form Validation - FirstName should be valid',()=>{
    let firstName = component.userForm.controls['firstName']
    firstName.setValue("Alan")

    expect(firstName.valid).toBeTruthy()
    
  })

  // it("data loaded",()=>{
  //   let firstName = component.userForm.controls['firstName']
  //   console.log(firstName.value)
  // })
  it('Reactive Form Validation - LastName check',()=>{
    let lastName = component.userForm.controls['lastName']

    expect(lastName.valid).toBeFalsy()
    expect(lastName.errors?.required).toBeTruthy()
  })

  it('Reactive Form Validation - LastName should be valid',()=>{
    let lastName = component.userForm.controls['lastName']
    lastName.setValue("R S")

    expect(lastName.valid).toBeTruthy()
  })
  it('Reactive Form Validation - Email check',()=>{
    let email = component.userForm.controls['email']

    expect(email.valid).toBeFalsy()
    expect(email.errors?.required).toBeTruthy()
  })
  it('Reactive Form Validation - Email should be valid',()=>{
    let email = component.userForm.controls['email']
    email.setValue("alanrs@gmail.com")

    expect(email.valid).toBeTruthy()
    
  })

  it('Reactive Form Validation - User Type check',()=>{
    let userType = component.userForm.controls['userType']

    expect(userType.valid).toBeFalsy()
    expect(userType.errors?.required).toBeTruthy()
  })

  it('Reactive Form Validation - User Type should be valid',()=>{
    let userType = component.userForm.controls['userType']
    userType.setValue(101)

    expect(userType.valid).toBeTruthy()
    
  })

  it('Reactive Form Validation - Stream check',()=>{
    let stream = component.userForm.controls['stream']

    expect(stream.valid).toBeFalsy()
    expect(stream.errors?.required).toBeTruthy()
  })

  it('Reactive Form Validation - Stream check',()=>{
    let stream = component.userForm.controls['stream']
    stream.setValue({streamName:"Computer Engineering"})

    expect(stream.valid).toBeTruthy()
    
  })
  it('Reactive Form Validation - Phone Number check',()=>{
    let phoneNumber = component.userForm.controls['phoneNumber']

    expect(phoneNumber.valid).toBeFalsy()
    expect(phoneNumber.errors?.required).toBeTruthy()
  })
  it('Reactive Form Validation - Phone Number should be valid',()=>{
    let phoneNumber = component.userForm.controls['phoneNumber']
    phoneNumber.setValue("+918634355756")

    expect(phoneNumber.valid).toBeTruthy()
    
  })
  it('should call createUser() on submit', fakeAsync(() => {
    spyOn(component, 'createUser');
  
    let button = fixture.debugElement.nativeElement.querySelector('#submitButton');
    button.click();
    tick();
    expect(component.createUser).toHaveBeenCalled();
  
  }));

 
});
