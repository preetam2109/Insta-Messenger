import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHeaderComponent } from './sms-header.component';

describe('SmsHeaderComponent', () => {
  let component: SmsHeaderComponent;
  let fixture: ComponentFixture<SmsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
