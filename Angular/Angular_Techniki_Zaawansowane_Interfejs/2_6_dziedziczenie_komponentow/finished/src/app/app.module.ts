import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicCardComponent } from './ui/dynamic-card.component';
import { PopupMessageComponent } from './ui/popup-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicCardComponent,
    PopupMessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
