import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-settings-form',
  templateUrl: './chart-settings-form.component.html',
  styleUrls: ['./chart-settings-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartSettingsFormComponent implements OnInit {
  @Input() chart: any;
  public chartSettingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeFormSettings();
  }

  private initializeFormSettings(): void {
    this.chartSettingsForm = this.formBuilder.group({
      dataSource: [''],
      name: ['']
    });
  }

}
