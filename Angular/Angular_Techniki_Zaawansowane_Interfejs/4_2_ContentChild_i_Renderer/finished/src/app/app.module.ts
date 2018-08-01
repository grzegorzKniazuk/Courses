import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdownDirective } from './ui/dropdown/dropdown.directive';
import { DropdownToggleDirective } from './ui/dropdown/dropdown-toggle.directive';
import { DropdownMenuDirective } from './ui/dropdown/dropdown-menu.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    DropdownToggleDirective,
    DropdownMenuDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
