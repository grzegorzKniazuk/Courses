import { FormControl, ValidationErrors } from '@angular/forms';

export const flightCodeValidator = (formControl: FormControl): ValidationErrors |null => {
  return <string>(formControl.value).startsWith('SK') ? null : { incorrectCode: true };
};
