import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHospitalsComponent } from './all-hospitals.component';

describe('AllHospitalsComponent', () => {
  let component: AllHospitalsComponent;
  let fixture: ComponentFixture<AllHospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
