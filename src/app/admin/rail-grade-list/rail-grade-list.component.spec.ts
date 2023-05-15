import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailGradeListComponent } from './rail-grade-list.component';

describe('RailGradeListComponent', () => {
  let component: RailGradeListComponent;
  let fixture: ComponentFixture<RailGradeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailGradeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RailGradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
