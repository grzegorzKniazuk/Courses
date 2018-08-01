import {Address} from "./address";
import {CustomerType} from "../enums/customerType";

export interface Customer {
  id?: number;
  name: string;
  photoUrl: string;
  description: string;
  age: number;
  address: Address;
  type: CustomerType;
  categories: string[];
}
