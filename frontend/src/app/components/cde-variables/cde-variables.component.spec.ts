import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdeVariablesComponent } from './cde-variables.component';

describe('CdeVariablesComponent', () => {
  let component: CdeVariablesComponent;
  let fixture: ComponentFixture<CdeVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdeVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdeVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
