import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PanelComponent } from './ui/panel/panel.component';
import { PanelCloseComponent } from './ui/panel/panel-close.component';
import { PanelTabComponent } from './ui/panel/panel-tab.component';
import { PanelBaseComponent } from './ui/panel/panel-base.component';
import { TabsNavComponent } from './ui/panel/tabs-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    PanelCloseComponent,
    PanelTabComponent,
    PanelBaseComponent,
    TabsNavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
