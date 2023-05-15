import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailSectionListComponent } from './rail-section-list.component';

describe('RailSectionListComponent', () => {
  let component: RailSectionListComponent;
  let fixture: ComponentFixture<RailSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailSectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RailSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
