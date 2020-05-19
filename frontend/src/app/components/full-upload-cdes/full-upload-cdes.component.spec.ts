import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullUploadCdesComponent } from './full-upload-cdes.component';

describe('FullUploadCdesComponent', () => {
  let component: FullUploadCdesComponent;
  let fixture: ComponentFixture<FullUploadCdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullUploadCdesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullUploadCdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
