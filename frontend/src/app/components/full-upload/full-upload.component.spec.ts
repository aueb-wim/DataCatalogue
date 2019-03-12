import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullUploadComponent } from './full-upload.component';

describe('FullUploadComponent', () => {
  let component: FullUploadComponent;
  let fixture: ComponentFixture<FullUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
