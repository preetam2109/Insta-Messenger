import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTemplateCreateComponent } from './sms-template-create.component';

describe('SmsTemplateCreateComponent', () => {
  let component: SmsTemplateCreateComponent;
  let fixture: ComponentFixture<SmsTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsTemplateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
