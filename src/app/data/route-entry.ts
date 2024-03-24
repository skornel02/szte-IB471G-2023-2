import { DocumentReference } from "@angular/fire/firestore";
import Router from "./router";
import Interface from "./interface";

export default interface RouteEntry {
    router: DocumentReference<Router>;

    source: RouteEntrySource;

    lastModifiedDate: Date;
    lastModifiedBy: string;

    network: string;
    netmask: string;

    gateway?: string;
    interface?: DocumentReference<Interface>;
    metric?: number;
}

export const RouteEntrySources = [
    "Attached",
    "Static",
    "NextHop",
] as const;

export type RouteEntrySource = typeof RouteEntrySources[number];