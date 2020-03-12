import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadCdesComponent } from './form-upload-cdes.component';

describe('FormUploadCdesComponent', () => {
  let component: FormUploadCdesComponent;
  let fixture: ComponentFixture<FormUploadCdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUploadCdesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadCdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
