import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';
import { HomeModule } from '../../home.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ],
      imports:[HomeModule],
      providers:[
        {
          provide:MAT_DIALOG_DATA,
          useValue:{
            data:{
              firstName:"Alan",
              stream:{streamName:"Computer"}
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue:{UserUpdateComponent}

        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateComponent);
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
  it('Reactive Form Validation - LastName check',()=>{
    let lastName = component.userForm.controls['lastName']

    expect(lastName.valid).toBeFalsy()
    expect(lastName.errors?.required).toBeTruthy()
  })

  it('Reactive Form Validation - User Type check',()=>{
    let userType = component.userForm.controls['userType']

    expect(userType.valid).toBeFalsy()
    expect(userType.errors?.required).toBeTruthy()
  })

  it('Reactive Form Validation - Stream check',()=>{
    let stream = component.userForm.controls['stream']

    expect(stream.valid).toBeFalsy()
    expect(stream.errors?.required).toBeTruthy()
  })
  it('Reactive Form Validation - Phone Number check',()=>{
    let phoneNumber = component.userForm.controls['phoneNumber']

    expect(phoneNumber.valid).toBeFalsy()
    expect(phoneNumber.errors?.required).toBeTruthy()
  })

  it('should call update() on submit', fakeAsync(() => {
    spyOn(component, 'updateUser');
  
    let button = fixture.debugElement.nativeElement.querySelector('#updateButton');
    button.click();
    tick();
    expect(component.updateUser).toHaveBeenCalled();
  
  }));
});
