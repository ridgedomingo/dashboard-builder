import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomChartsModule } from './charts/charts.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent
  ],
  imports: [
    BrowserModule,
    CustomChartsModule,
    FontAwesomeModule,
    GridsterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
