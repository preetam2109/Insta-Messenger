import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHeaderCreateComponent } from './sms-header-create.component';

describe('SmsHeaderCreateComponent', () => {
  let component: SmsHeaderCreateComponent;
  let fixture: ComponentFixture<SmsHeaderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsHeaderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsHeaderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
