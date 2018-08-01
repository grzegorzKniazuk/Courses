import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PanelComponent } from './ui/panel/panel.component';
import { PanelCloseComponent } from './ui/panel/panel-close.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    PanelCloseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
