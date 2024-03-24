import { DocumentReference } from "@angular/fire/firestore";
import Interface from "./interface";
import Bridge from "./bridge";
import RouteEntry from "./route-entry";

export default interface Router {
    ownerId: string;
    name: string;
    
    lastModifiedDate: Date;
    lastModifiedBy: string;

    powered: boolean;

    interfaces: DocumentReference<Interface>[],
    bridges: DocumentReference<Bridge>[],
    routeTable: DocumentReference<RouteEntry>[];
}
