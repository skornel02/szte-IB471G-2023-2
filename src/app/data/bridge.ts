import { DocumentReference, Timestamp } from "@angular/fire/firestore";
import Router from "./router";
import Interface from "./interface";

export default interface Bridge {
    name: string;

    lastModifiedDate: Timestamp;
    lastModifiedBy: string;

    connectedInterfaces: DocumentReference<Interface>[];
    virtualInterface : DocumentReference<Interface>;
}