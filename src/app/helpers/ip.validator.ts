import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Address4 } from 'ip-address';

export const ipValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ipAddress = control.value;

    if (!ipAddress) {
        return null;
    }

    try {
        const address = new Address4(ipAddress);

        return address.isCorrect() ? null : { invalidIp: true };
    } catch (e) {
        return { invalidIp: true };
    }
};
