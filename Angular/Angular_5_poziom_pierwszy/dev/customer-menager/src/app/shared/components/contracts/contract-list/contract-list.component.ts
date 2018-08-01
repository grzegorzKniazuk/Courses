import { Component, OnInit } from '@angular/core';
import {Contract} from "../../../../core/models/contract";
import {ContractService} from "../../../../core/services/contract.service";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  public contracts: Contract[];
  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.contractService.getContracts().subscribe(contracts => {
      this.contracts = contracts;
    })
  }
}
