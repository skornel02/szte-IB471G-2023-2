import { DocumentReference } from "@angular/fire/firestore";
import Router from "./router";
import Interface from "./interface";

export default interface Bridge {
    router: DocumentReference<Router>;

    name: string;

    lastModifiedDate: Date;
    lastModifiedBy: string;

    connectedInterfaces: DocumentReference<Interface>[];
    virtualInterface : DocumentReference<Interface>;
}