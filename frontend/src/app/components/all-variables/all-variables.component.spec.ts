import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVariablesComponent } from './all-variables.component';

describe('AllVariablesComponent', () => {
  let component: AllVariablesComponent;
  let fixture: ComponentFixture<AllVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
