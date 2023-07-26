import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUserCreationComponent } from './bulk-user-creation.component';

describe('BulkUserCreationComponent', () => {
  let component: BulkUserCreationComponent;
  let fixture: ComponentFixture<BulkUserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUserCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
