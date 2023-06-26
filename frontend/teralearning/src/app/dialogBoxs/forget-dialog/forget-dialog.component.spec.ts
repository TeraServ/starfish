import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetDialogComponent } from './forget-dialog.component';

describe('ForgetDialogComponent', () => {
  let component: ForgetDialogComponent;
  let fixture: ComponentFixture<ForgetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
