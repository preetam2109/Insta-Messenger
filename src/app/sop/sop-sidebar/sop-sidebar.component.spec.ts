import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopSidebarComponent } from './sop-sidebar.component';

describe('SopSidebarComponent', () => {
  let component: SopSidebarComponent;
  let fixture: ComponentFixture<SopSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
