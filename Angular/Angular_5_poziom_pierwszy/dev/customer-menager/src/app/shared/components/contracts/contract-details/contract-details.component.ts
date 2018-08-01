import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContractService} from "../../../../core/services/contract.service";
import {Contract} from "../../../../core/models/contract";

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  public contract: Contract;
  constructor(private activatedRoute: ActivatedRoute, private contractService: ContractService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.contractService.getContract(+params['id']).subscribe(contract => {
        this.contract = contract;
      })
    })
  }

}
