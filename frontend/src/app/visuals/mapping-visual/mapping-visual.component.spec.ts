import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingVisualComponent } from './mapping-visual.component';

describe('MappingVisualComponent', () => {
  let component: MappingVisualComponent;
  let fixture: ComponentFixture<MappingVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
