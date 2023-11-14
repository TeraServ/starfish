import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearFormDialogComponent } from './clear-form-dialog.component';

describe('ClearFormDialogComponent', () => {
  let component: ClearFormDialogComponent;
  let fixture: ComponentFixture<ClearFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
