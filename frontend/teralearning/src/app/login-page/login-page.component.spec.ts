import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AppModule } from '../app.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports:[AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Reactive Form Validation - username check',()=>{
    let username = component.loginForm.controls['username']

    expect(username.valid).toBeFalsy()
    expect(username.errors?.required).toBeTruthy()
  })
  it('Reactive Form Validation - password check',()=>{
    let password = component.loginForm.controls['password']

    expect(password.valid).toBeFalsy()
    expect(password.errors?.required).toBeTruthy()
  })

 

  it('should call login() on submit', fakeAsync(() => {
    spyOn(component, 'login');
  
    let button = fixture.debugElement.nativeElement.querySelector('#loginButton');
    button.click();
    tick();
    expect(component.login).toHaveBeenCalled();
  
  }));

  
});
