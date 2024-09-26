import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { AlertService } from '../services/alert.service';

export function updateFormDirtyAndValueAndValidity(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key).markAsDirty();
    formGroup.get(key).updateValueAndValidity();
  });
}

export function updateFormPristineAndUntouched(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.get(key).markAsPristine();
    formGroup.get(key).markAsUntouched();
  });
  formGroup.reset();
}

export function publishStatus(
  alertService: AlertService,
  status: boolean,
  formGroup: FormGroup,
  updateFlg: boolean
): void {
  if (status) {
    alertService.success('app.success.msg-0', true);
    if (!updateFlg) {
      formGroup.reset();
    }
  } else {
    alertService.error('app.error.msg-0', true);
  }
}

export function logAllErrorsInForm(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((key) => {
    const controlErrors: ValidationErrors = formGroup.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach((keyError) => {
        console.log(
          'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          controlErrors[keyError]
        );
      });
    }
  });
}

export function logAllErrorsInFormControl(
  formControl: FormControl,
  formControlName: string
): void {
  const controlErrors: ValidationErrors = formControl?.errors;
  if (controlErrors != null) {
    Object.keys(controlErrors).forEach((keyError) => {
      console.log(
        'Key control: ' +
          formControlName +
          ', keyError: ' +
          keyError +
          ', err value: ',
        controlErrors[keyError]
      );
    });
  }
}
