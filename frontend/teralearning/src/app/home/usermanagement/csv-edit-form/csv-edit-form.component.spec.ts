import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvEditFormComponent } from './csv-edit-form.component';

describe('CsvEditFormComponent', () => {
  let component: CsvEditFormComponent;
  let fixture: ComponentFixture<CsvEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
