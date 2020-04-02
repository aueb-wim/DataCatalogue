import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVersionCdeComponent } from './create-new-version-cde.component';

describe('CreateNewVersionCdeComponent', () => {
  let component: CreateNewVersionCdeComponent;
  let fixture: ComponentFixture<CreateNewVersionCdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewVersionCdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewVersionCdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
