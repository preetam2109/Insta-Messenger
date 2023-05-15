import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopFooterComponent } from './sop-footer.component';

describe('SopFooterComponent', () => {
  let component: SopFooterComponent;
  let fixture: ComponentFixture<SopFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SopFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
