import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldingTechniqueListComponent } from './welding-technique-list.component';

describe('WeldingTechniqueListComponent', () => {
  let component: WeldingTechniqueListComponent;
  let fixture: ComponentFixture<WeldingTechniqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeldingTechniqueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeldingTechniqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
