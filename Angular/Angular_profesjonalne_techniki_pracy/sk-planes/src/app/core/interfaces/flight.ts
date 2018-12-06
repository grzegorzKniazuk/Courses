import { Crew } from './crew';

export interface Flight {
  additionalInformation: string;
  code: string;
  crew: Crew[];
  departureTime: string;
  destination: string;
  origin: string;
  returnTime: string;
  withSKPlanesDiscount: boolean;
  id: string;
}
