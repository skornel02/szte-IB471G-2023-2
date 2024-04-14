import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import Router from '../data/router';
import { RouterAuthService } from './router-auth.service';
import {
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    Timestamp,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from '@angular/fire/firestore';
import Interface from '../data/interface';

@Injectable({
    providedIn: 'root',
})
export class BusinessService {
    constructor(
        private db: DatabaseService,
        private auth: RouterAuthService
    ) {}

    async createRouter(name: string): Promise<Router> {
        const user = await this.auth.user;

        if (!user) {
            throw new Error('User not logged in');
        }

        const router = <Router>{
            ownerEmail: user.email ?? '-',
            name: name,
            lastModifiedDate: Timestamp.fromDate(new Date()),
            lastModifiedBy: user.email ?? '-',
            powered: false,
        };

        const result = await addDoc(this.db.routersCollection, router);
        router.id = result.id;

        updateDoc(doc(this.db.routersCollection, result.id), {
            id: result.id,
        });

        this.db.addInterface(result.id, {
            name: 'port1',
            mode: 'Static',
            type: 'PhysicalPort',
            ipAddress: '123.111.11.72',
            gateway: '10.12.11.1',
            netmask: '255.255.0.0',
        });

        const [switchInterface, bridge] = await this.db.addBridge(
            result.id,
            'switch-bridge',
            'switch'
        );

        this.db.addInterface(result.id, {
            name: 'port2',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.db.addInterface(result.id, {
            name: 'port3',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.db.addInterface(result.id, {
            name: 'port4',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.db.addInterface(result.id, {
            name: 'port5',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.db.addInterface(result.id, {
            name: 'wifi',
            mode: 'Slave',
            master: switchInterface,
            type: 'WiFiPort',
        });

        await this.recalculateRoutes(result.id);

        return router;
    }

    async recalculateRoutes(routerId: string) {
        const routeEntriesCollection = this.db.getRouteEntryCollection(routerId);
        const routeEntriesQuery = query(routeEntriesCollection, where('source', '!=', 'Static'));

        const routesToRemove = await getDocs(routeEntriesQuery);

        console.log('Removing routes: ', routesToRemove.docs);

        for (const route of routesToRemove.docs) {
            await deleteDoc(route.ref);
        }

        const interfacesCollection = this.db.getInterfaceCollection(routerId);

        const staticInterfaceQuery = query(
            interfacesCollection,
            where('mode', '==', 'Static'),
            orderBy('ipAddress')
        );
        const staticInterfaces = await getDocs(staticInterfaceQuery);

        for (const staticInterface of staticInterfaces.docs) {
            const interf = staticInterface.data() as Interface;

            console.log('Calculating routes for interface: ', interf);

            if (interf.gateway) {
                await this.db.addRouteEntry(routerId, {
                    network: '',
                    netmask: '0.0.0.0',
                    gateway: interf.gateway,
                    interface: staticInterface.ref,
                    source: 'NextHop',
                    metric: 0,
                });
            }

            await this.db.addRouteEntry(routerId, {
                network: interf.ipAddress!,
                netmask: interf.netmask!,
                interface: staticInterface.ref,
                source: 'Attached',
                metric: 100,
            });
        }
    }
}
