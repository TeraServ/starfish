import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamComponent } from './stream.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../../home.module';
import { DebugElement } from '@angular/core';
import { provideCloudflareLoader } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('StreamComponent', () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamComponent],
      imports: [ReactiveFormsModule, HomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validation for Stream name', () => {
    let streamName = component.createStreamForm.controls['streamName']
    expect(streamName.valid).toBeFalse();
    expect(streamName.errors?.required).toBeTruthy();
  })

  it('Validation for acronym', () => {
    let acronym = component.createStreamForm.controls['acronym']
    expect(acronym.valid).toBeFalse();
    expect(acronym.errors?.required).toBeTruthy();
  });

  it('Validation for price', () => {
    let price = component.createStreamForm.controls['price']
    expect(price.valid).toBeFalse();
    expect(price.errors?.required).toBeTruthy();
  })

  it('Validation for Discount', () => {
    let discount = component.createStreamForm.controls['discount']
    expect(discount.valid).toBeFalse();
    expect(discount.errors?.required).toBeTruthy();

  });


  it('should display error messages for empty stream name', () => {
    component.submitted = true;
    component.createStreamForm.controls.streamName.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  });
  
  it('should display error messages for empty acronym name', () => {
    component.submitted = true;
    component.createStreamForm.controls.acronym.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  }); 

  it('should display error messages for empty price', () => {
    component.submitted = true;
    component.createStreamForm.controls.price.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  });

  it('should display error messages for empty discount', () => {
    component.submitted = true;
    component.createStreamForm.controls.discount.setValue('');
    fixture.detectChanges();
  
    const errorElement = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorElement.nativeElement.textContent).toContain('*Required');
  });

  
  it('should display error messages for invalid Stream name pattern', (done) => {
    component.createStreamForm.controls.streamName.setValue('314');
    component.submitted = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const validation = fixture.debugElement.query(By.css('#invalidStreamName'));
      expect(validation.nativeElement.textContent).toContain('Invalid');

      done();
    })
  })

  it('should display error messages for invalid acronymn pattern', (done) => {
    component.createStreamForm.controls.acronym.setValue('314');
    component.submitted = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const validation = fixture.debugElement.query(By.css('#invalidacronym'));
      expect(validation.nativeElement.textContent).toContain('Invalid');

      done();
    })
  })


  it('show error if price input is -1', (done) => {
    component.createStreamForm.controls.price.setValue(-1);
    component.submitted = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      console.log('sub', component.createStreamForm.controls.price.errors)
      const validation = fixture.debugElement.query(By.css('#priceValue_0_validation'));
      console.log('validation1', validation);
      expect(validation.nativeNode.innerText).toEqual('Value must be at least 0');
      expect(validation).toBeTruthy();

      done();
    })
  });   


  it('show error if discount input is between 0 and 100',(done) =>{

    component.createStreamForm.controls.discount.setValue(101);
    component.submitted = true;
    fixture.detectChanges();
    component.createStreamForm.controls.discount.setValue(-1);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      console.log('sub', component.createStreamForm.controls.discount.errors)
      const validation = fixture.debugElement.query(By.css('#discount_min_max_validation'));
      console.log('validation3', validation);
      expect(validation.nativeNode.innerText).toEqual('Value must be between 0 and 100');
      expect(validation).toBeTruthy();

      done();
    })
  });
  

});



