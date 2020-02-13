import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBaseComponent } from './charts-base.component';

describe('ChartsBaseComponent', () => {
  let component: ChartsBaseComponent;
  let fixture: ComponentFixture<ChartsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
