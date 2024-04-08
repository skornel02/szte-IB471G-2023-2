import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import Router from './router';

export default interface Interface {
    name: string;
    type: InterfaceType;

    mode: InterfaceMode;

    /* Static mode */
    ipAddress?: string;
    netmask?: string;
    gateway?: string;

    /* Slave mode */
    master?: DocumentReference;
}

export const InterfaceTypes = ['PhysicalPort', 'VirtualPort', 'WiFiPort'] as const;

export type InterfaceType = (typeof InterfaceTypes)[number];

export const InterfaceModes = ['DHCP', 'Static', 'Slave'] as const;

export type InterfaceMode = (typeof InterfaceModes)[number];

export const InterfaceStatuses = ['Up', 'Invalid', 'Down'] as const;

export type InterfaceStatus = (typeof InterfaceStatuses)[number];
