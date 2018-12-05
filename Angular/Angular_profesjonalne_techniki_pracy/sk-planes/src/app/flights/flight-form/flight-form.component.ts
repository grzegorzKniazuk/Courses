import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../core/interfaces/role';
import { RoleLabel, RoleValue } from '../../core/enums/role.enum';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {

  public readonly jobs: Role[] = [
    { label: RoleLabel.Stewardess, value: RoleValue.Stewardess },
    { label: RoleLabel.SeniorCabinCrew, value: RoleValue.SeniorCabinCrew },
    { label: RoleLabel.Pilot, value: RoleValue.Pilot },
    { label: RoleLabel.CoPilot, value: RoleValue.CoPilot },
    { label: RoleLabel.Mechanic, value: RoleValue.Mechanic },
  ];
  public flightForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  public get crew(): FormArray {
    return <FormArray>this.flightForm.get('crew');
  }

  private buildForm(): void {
    this.flightForm = this.formBuilder.group({
      origin: ['', [ Validators.required ]],
      destination: ['', [ Validators.required ]],
      departureTime: ['', [ Validators.required ]],
      returnTime: ['', [ Validators.required ]],
      code: ['SK', [ Validators.required, Validators.minLength(4), Validators.maxLength(7) ]],
      additionalInformation: '',
      withSKPlanesDiscount: '',
      crew: this.formBuilder.array([this.buildCrewMember()]),
    });
  }

  public buildCrewMember(): FormGroup {
    return this.formBuilder.group({
      name: '',
      job: '',
    });
  }

  public addCrewMember(): void {
    this.crew.push(this.buildCrewMember());
  }

  public removeCrewMember(index: number): void {
    this.crew.removeAt(index);
  }
}
