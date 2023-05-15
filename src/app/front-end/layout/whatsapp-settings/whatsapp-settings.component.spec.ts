import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappSettingsComponent } from './whatsapp-settings.component';

describe('WhatsappSettingsComponent', () => {
  let component: WhatsappSettingsComponent;
  let fixture: ComponentFixture<WhatsappSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
