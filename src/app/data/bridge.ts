import { DocumentReference, Timestamp } from "@angular/fire/firestore";
import Router from "./router";
import Interface from "./interface";

export default interface Bridge {
    name: string;

    lastModifiedDate: Timestamp;
    lastModifiedBy: string;

    virtualInterface : DocumentReference;
}