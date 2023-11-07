import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndSearchComponent } from './view-and-search.component';

describe('ViewAndSearchComponent', () => {
  let component: ViewAndSearchComponent;
  let fixture: ComponentFixture<ViewAndSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
