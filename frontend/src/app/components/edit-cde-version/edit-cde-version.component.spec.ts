import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCdeVersionComponent } from './edit-cde-version.component';

describe('EditCdeVersionComponent', () => {
  let component: EditCdeVersionComponent;
  let fixture: ComponentFixture<EditCdeVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCdeVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCdeVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
