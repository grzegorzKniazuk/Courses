import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Contract} from "../models/contract";
import {Observable} from "rxjs";
import {ContractService} from "./contract.service";

@Injectable({
  providedIn: 'root'
})
export class ContractResolverService implements Resolve<Contract> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract> | Promise<Contract> | Contract {
    return this.contractService.getContract(+route.params['id']);
  }

  constructor(private contractService: ContractService) { }
}
