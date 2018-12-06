import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../core/interfaces/role';
import { RoleLabel, RoleValue } from '../../core/enums/role.enum';
import { Flight } from '../../core/interfaces/flight';
import { Crew } from '../../core/interfaces/crew';
import { flightCodeValidator } from '../../core/validators/code.validator';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightFormComponent implements OnInit {

  @Input() private editMode: boolean = false;
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
      code: ['SK', [ Validators.required, Validators.minLength(4), Validators.maxLength(7), flightCodeValidator ]],
      additionalInformation: '',
      withSKPlanesDiscount: '',
      crew: this.formBuilder.array(this.editMode ? [] : [this.buildCrewMember()]),
    });
  }

  public buildCrewMember(crewMember: Crew = {} as Crew): FormGroup {
    return this.formBuilder.group({
      name: crewMember.name || '',
      job: crewMember.job || '',
    });
  }

  public addCrewMember(crewMember?: Crew): void {
    this.crew.push(this.buildCrewMember(crewMember));
  }

  public removeCrewMember(index: number): void {
    this.crew.removeAt(index);
  }

  public setFlight(flight: Flight): void {
    const { id, ...formData } = flight;
    this.flightForm.patchValue(formData);
    if (formData.crew) {
      formData.crew.forEach((crewMember: Crew) => {
        this.addCrewMember(crewMember);
      });
    }
  }
}
