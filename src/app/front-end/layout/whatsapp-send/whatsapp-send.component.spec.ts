import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappSendComponent } from './whatsapp-send.component';

describe('WhatsappSendComponent', () => {
  let component: WhatsappSendComponent;
  let fixture: ComponentFixture<WhatsappSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
