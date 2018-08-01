import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config, CONFIG} from "../models/config";
import {Contract} from "../models/contract";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient, @Inject(CONFIG) private config: Config) { }
  public getContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${this.config.apiUrl}/contracts`);
  }
  public getContract(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(`${this.config.apiUrl}/contracts/${id}`);
  }
}
