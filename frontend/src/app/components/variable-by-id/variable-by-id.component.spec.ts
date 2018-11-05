import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableByIdComponent } from './variable-by-id.component';

describe('VariableByIdComponent', () => {
  let component: VariableByIdComponent;
  let fixture: ComponentFixture<VariableByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
