import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDetailsComponent } from './version-details.component';

describe('VersionDetailsComponent', () => {
  let component: VersionDetailsComponent;
  let fixture: ComponentFixture<VersionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
