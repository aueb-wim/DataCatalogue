import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariableVersionComponent } from './edit-variable-version.component';

describe('EditVariableVersionComponent', () => {
  let component: EditVariableVersionComponent;
  let fixture: ComponentFixture<EditVariableVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariableVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariableVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
