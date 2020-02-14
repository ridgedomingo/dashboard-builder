import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ColorPickerModule } from 'ngx-color-picker';
import { CustomChartsModule } from './charts/charts.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridsterModule } from 'angular-gridster2';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { ChartSettingsFormComponent } from './chart-settings-form/chart-settings-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    ChartSettingsFormComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    CustomChartsModule,
    FontAwesomeModule,
    FormsModule,
    GridsterModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
