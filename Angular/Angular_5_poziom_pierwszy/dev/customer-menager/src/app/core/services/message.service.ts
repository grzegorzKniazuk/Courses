import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  public success(msg: string): void {
    this.toastrService.success(msg);
  }

  public error(msg: string): void {
    this.toastrService.error(msg);
  }
}
