import { DocumentReference, Timestamp } from "@angular/fire/firestore";
import Router from "./router";

export default interface Interface {
    name: string;
    type : InterfaceType;

    lastModifiedDate: Timestamp;
    lastModifiedBy: string;
    
    mode: InterfaceMode;

    /* Static mode */
    ipAddress?: string;
    netmask?: string;
    gateway?: string;
    
    /* Slave mode */
    master: DocumentReference<Interface>;
}

export const InterfaceTypes = [
    "PhysicalPort",
    "VirtualPort",
    "WiFiPort",
] as const;

export type InterfaceType = typeof InterfaceTypes[number];

export const InterfaceModes = [
    "DHCP",
    "Static",
    "Slave"
]

export type InterfaceMode = typeof InterfaceModes[number];
