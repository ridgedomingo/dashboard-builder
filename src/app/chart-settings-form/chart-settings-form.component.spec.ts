import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSettingsFormComponent } from './chart-settings-form.component';

describe('ChartSettingsFormComponent', () => {
  let component: ChartSettingsFormComponent;
  let fixture: ComponentFixture<ChartSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
