import { TabsNavComponent } from './tabs-nav.component'
import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList } from '@angular/core'
import { PanelTabComponent } from './panel-tab.component'
import { PanelCloseComponent } from './panel-close.component'
import { PanelBaseComponent } from './panel-base.component';

@Component({
  selector: 'panel',
  template: `
    <div class="card" *ngIf="open">
      <ng-content select=".card-header"></ng-content>
      
      <div class="card-body">    
        <ng-content></ng-content>
      </div>
      
      <ng-content select=".card-footer"></ng-content>
    </div>
  `,
  styles: []
})
export class PanelComponent extends PanelBaseComponent implements OnInit, AfterContentInit {

  @ContentChild(TabsNavComponent)
  nav:TabsNavComponent

  @ContentChildren(PanelTabComponent)
  panels = new QueryList<PanelTabComponent>()

  ngAfterContentInit() {
    if(this.nav){
      this.nav.panels = this.panels
      this.nav.onOpen.subscribe(panel => {
        this.openTab(panel)
      })
    }

    setTimeout(()=>{
      if(this.panels.length){
        this.openTab(this.panels.first)
      }
    })
    super.ngAfterContentInit()
  }

  openTab(panel){
    this.panels.toArray().forEach(panel=>{
      panel.open = false
    })
    panel.open = true
  }
}
