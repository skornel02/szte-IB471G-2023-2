import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import Interface from './interface';
import Bridge from './bridge';
import RouteEntry from './route-entry';

export default interface Router {
    id: string;

    ownerEmail: string;
    name: string;

    lastModifiedDate: Timestamp;
    lastModifiedBy: string;

    powered: boolean;
}
