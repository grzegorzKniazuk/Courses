import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { CustomerAddComponent } from "../../shared/components/customer/customer-add/customer-add.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CustomerAddDeactivateGuardService implements CanDeactivate<CustomerAddComponent> {

  public canDeactivate(component: CustomerAddComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !(component.name || component.age || component.type);
  }
}                                                                                                                                                      
