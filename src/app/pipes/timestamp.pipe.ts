import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
    name: 'timestamp',
    standalone: true,
})
export class TimestampPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): Date | null {
        if (value instanceof Timestamp) {
            return value.toDate();
        }

        console.error('Invalid value for timestamp pipe: ', value);
        return null;
    }
}
