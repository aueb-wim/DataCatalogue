import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologiesComponent } from './pathologies.component';

describe('PathologiesComponent', () => {
  let component: PathologiesComponent;
  let fixture: ComponentFixture<PathologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
