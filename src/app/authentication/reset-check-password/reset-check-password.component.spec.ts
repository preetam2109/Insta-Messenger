import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCheckPasswordComponent } from './reset-check-password.component';

describe('ResetCheckPasswordComponent', () => {
  let component: ResetCheckPasswordComponent;
  let fixture: ComponentFixture<ResetCheckPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetCheckPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetCheckPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
