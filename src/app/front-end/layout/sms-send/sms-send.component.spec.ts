import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSendComponent } from './sms-send.component';

describe('SmsSendComponent', () => {
  let component: SmsSendComponent;
  let fixture: ComponentFixture<SmsSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
