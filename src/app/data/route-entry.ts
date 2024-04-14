import { DocumentReference, Timestamp } from '@angular/fire/firestore';

export default interface RouteEntry {
    source: RouteEntrySource;

    network: string;
    netmask: string;

    gateway?: string;
    interface?: DocumentReference;
    metric?: number;
}

export const RouteEntrySources = ['Attached', 'Static', 'NextHop'] as const;

export type RouteEntrySource = (typeof RouteEntrySources)[number];
