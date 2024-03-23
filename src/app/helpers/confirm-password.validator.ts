import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    return control.value.password === control.value.passwordAgain
        ? null
        : { passwordmismatch: true };
};
