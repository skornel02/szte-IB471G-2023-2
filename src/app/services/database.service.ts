import { Injectable, OnDestroy, inject } from '@angular/core';
import { RouterAuthService } from './router-auth.service';
import {
    DocumentSnapshot,
    Firestore,
    Timestamp,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    documentId,
    getDoc,
    query,
    setDoc,
    updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Router from '../data/router';
import Interface from '../data/interface';
import Bridge from '../data/bridge';
import RouteEntry from '../data/route-entry';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    private firestore: Firestore = inject(Firestore);
    private auth: RouterAuthService = inject(RouterAuthService);

    private routersCollection;
    $routers: Observable<Router[]>;

    constructor() {
        this.routersCollection = collection(this.firestore, 'routers');
        this.$routers = collectionData(this.routersCollection) as Observable<Router[]>;
    }

    getInterfaceCollection(routerId: string) {
        return collection(this.routersCollection, routerId, 'interfaces');
    }

    getRouteEntryCollection(routerId: string) {
        return collection(this.routersCollection, routerId, 'route-entries');
    }

    getBridgeCollection(routerId: string) {
        return collection(this.routersCollection, routerId, 'bridges');
    }

    getRouter(routerId: string): Promise<DocumentSnapshot<Router>> {
        return getDoc(doc(this.routersCollection, routerId)) as Promise<DocumentSnapshot<Router>>;
    }

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

        const result = await addDoc(this.routersCollection, router);
        router.id = result.id;

        updateDoc(doc(this.routersCollection, result.id), {
            id: result.id,
        });

        this.addInterface(result.id, {
            name: 'port1',
            mode: 'Static',
            type: 'PhysicalPort',
            ipAddress: '123.111.11.72',
            gateway: '10.12.11.1',
            netmask: '255.255.0.0',
        });

        const switchInterface = await this.addInterface(result.id, {
            name: 'switch',
            mode: 'Static',
            ipAddress: '192.168.0.1',
            netmask: '255.255.255.0',
            type: 'VirtualPort',
        });

        this.addBridge(result.id, {
            name: 'local-bridge',
            virtualInterfaceName: 'switch',
            virtualInterface: switchInterface,
        });

        this.addInterface(result.id, {
            name: 'port2',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.addInterface(result.id, {
            name: 'port3',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.addInterface(result.id, {
            name: 'port4',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.addInterface(result.id, {
            name: 'port5',
            mode: 'Slave',
            master: switchInterface,
            type: 'PhysicalPort',
        });

        this.addInterface(result.id, {
            name: 'wifi',
            mode: 'Slave',
            master: switchInterface,
            type: 'WiFiPort',
        });

        return router;
    }

    async deleteRouter(routerId: string): Promise<void> {
        const user = await this.auth.user;

        if (!user) {
            throw new Error('User not logged in');
        }

        await deleteDoc(doc(this.routersCollection, routerId));
    }

    async toggleRouterPower(routerId: string): Promise<void> {
        const user = await this.auth.user;

        if (!user) {
            throw new Error('User not logged in');
        }

        const router = await getDoc(doc(this.routersCollection, routerId));
        const routerData = router.data() as Router;

        await updateDoc(doc(this.routersCollection, routerId), {
            powered: !routerData.powered,
            lastModifiedBy: user.email ?? '-',
            lastModifiedDate: Timestamp.fromDate(new Date()),
        });
    }

    getInterfaces(routerId: string): Observable<Interface[]> {
        const interfacesCollection = this.getInterfaceCollection(routerId);
        return collectionData(interfacesCollection) as Observable<Interface[]>;
    }

    getBridges(routerId: string): Observable<Bridge[]> {
        const bridgesCollection = this.getBridgeCollection(routerId);
        return collectionData(bridgesCollection) as Observable<Bridge[]>;
    }

    getRouteEntries(routerId: string): Observable<RouteEntry[]> {
        const routeEntriesCollection = this.getRouteEntryCollection(routerId);
        return collectionData(routeEntriesCollection) as Observable<RouteEntry[]>;
    }

    addInterface(routerId: string, interf: Interface) {
        const interfacesCollection = this.getInterfaceCollection(routerId);
        return addDoc(interfacesCollection, interf);
    }

    addBridge(routerId: string, bridge: Bridge) {
        const bridgesCollection = this.getBridgeCollection(routerId);
        return addDoc(bridgesCollection, bridge);
    }

    addRouteEntry(routerId: string, routeEntry: RouteEntry) {
        const routeEntriesCollection = this.getRouteEntryCollection(routerId);
        return addDoc(routeEntriesCollection, routeEntry);
    }
}
