import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formError',
    standalone: true,
})
export class FormErrorPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        if (value === null || typeof value !== 'object') {
            return null;
        }

        if ('required' in value) {
            return 'This field is required!';
        }

        if ('email' in value) {
            return 'Must be a valid email!';
        }

        if ('minlength' in value) {
            const minLength = value.minlength as { requiredLength: number; actualLength: number };
            return `Must be at least ${minLength.requiredLength} characters long (currently: ${minLength.actualLength})!`;
        }

        if ('passwordmismatch' in value) {
            return 'Passwords do not match!';
        }

        console.log('Unknown error reason: ', value);
        return 'Invalid value!';
    }
}
