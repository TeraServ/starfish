import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HomeModule } from '../../home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports:[HomeModule,BrowserAnimationsModule,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("should call onUpdateClicked() on edit click", fakeAsync(() => {
  //   spyOn(component, 'onUpdateClicked');
  //   let data={
  //     firstName:"Alan",
  //     lastName:"R S",
  //     email:"alanrs2@gmail.com",
  //     phoneNumber:"+9185758474",
  //     stream:{streamName:"Computer Engineering"},
  //     userStatus:101,
  //     userType:101
  //   }
  
  //   let button = fixture.debugElement.nativeElement.querySelector('#editButton');
  //   button.click()
  //   tick();
  //   expect(component.onUpdateClicked).toHaveBeenCalled();
  
  // }));
});
