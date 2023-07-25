import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectComponent } from './subject.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../../home.module';
import { By } from '@angular/platform-browser';

describe('SubjectComponent', () => {
  let component: SubjectComponent;
  let fixture: ComponentFixture<SubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectComponent ],
      imports: [ReactiveFormsModule, HomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validation for Stream name',()=>{
    let stream = component.createSubjectForm.controls['stream']
    expect(stream.valid).toBeFalse();
    expect(stream.errors?.required).toBeTruthy();    
  })

  it('Validation for Subject name',()=>{
    let subjectName = component.createSubjectForm.controls['subjectName']
    expect(subjectName.valid).toBeFalse();
    expect(subjectName.errors?.required).toBeTruthy();
  })   
  
  it('should display error messages for empty stream selection', () => {
    component.submitted = true;
    component.createSubjectForm.controls.stream.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  });
  
  
  it('should display error messages for empty subject name', () => {
    component.submitted = true;
    component.createSubjectForm.controls.subjectName.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  });
  
  it('should display error messages for invalid subject name pattern', (done) => {
    component.createSubjectForm.controls.subjectName.setValue('1234');
    component.submitted = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const validation = fixture.debugElement.query(By.css('#invalidSubjectName'));
      expect(validation.nativeElement.textContent).toContain('Invalid');

      done();
    })
  })
    
});
