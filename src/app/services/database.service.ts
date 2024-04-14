import { Injectable, OnDestroy, inject } from '@angular/core';
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

    routersCollection;
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

    async updateInterface(routerId: string, interf: Interface) {
        const interfaceCollection = this.getInterfaceCollection(routerId);
        const interfaceQuery = query(interfaceCollection, where('name', '==', interf.name));

        const docs = await getDocs(interfaceQuery);

        for (const doc of docs.docs) {
            await setDoc(doc.ref, interf);
        }
    }

    getInterfaceReference(routerId: string, interfaceId: string) {
        return doc(this.getInterfaceCollection(routerId), interfaceId);
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

    async addBridge(
        routerId: string,
        bridgeName: string,
        interfaceName: string
    ): Promise<[DocumentReference, DocumentReference]> {
        const switchInterface = await this.addInterface(routerId, {
            name: interfaceName,
            mode: 'Static',
            ipAddress: '192.168.0.1',
            netmask: '255.255.255.0',
            type: 'VirtualPort',
        });

        const bridge = await this.addBridgePrivate(routerId, {
            name: bridgeName,
            virtualInterfaceName: interfaceName,
            virtualInterface: switchInterface,
        });

        return [switchInterface, bridge];
    }

    private addBridgePrivate(routerId: string, bridge: Bridge) {
        const bridgesCollection = this.getBridgeCollection(routerId);
        return addDoc(bridgesCollection, bridge);
    }

    async deleteBridge(routerId: string, bridge: Bridge) {
        const bridgesCollection = this.getBridgeCollection(routerId);
        const bridgeQuery = query(bridgesCollection, where('name', '==', bridge.name));

        const docs = await getDocs(bridgeQuery);

        for (const doc of docs.docs) {
            const selectedBridge = doc.data() as Bridge;

            if (selectedBridge.virtualInterface.path === bridge.virtualInterface.path) {
                await deleteDoc(doc.ref);
                await deleteDoc(selectedBridge.virtualInterface);
            }
        }
    }

    addRouteEntry(routerId: string, routeEntry: RouteEntry) {
        const routeEntriesCollection = this.getRouteEntryCollection(routerId);
        return addDoc(routeEntriesCollection, routeEntry);
    }
}
