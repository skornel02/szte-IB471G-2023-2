import { Injectable, OnDestroy, inject } from "@angular/core";
import { RouterAuthService } from "./router-auth.service";
import { Firestore, collection, collectionData, documentId } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import Router from "../data/router";

@Injectable({
    providedIn: 'root',
})
export class DatabaseService implements OnDestroy {
    private firestore: Firestore = inject(Firestore);
    private auth: RouterAuthService = inject(RouterAuthService);

    private routersCollection;
    $routers: Observable<Router[]>;

    constructor() {
        this.routersCollection = collection(this.firestore, 'routers');
        this.$routers = collectionData(this.routersCollection) as Observable<Router[]>;
    }

    ngOnDestroy(): void {
    }
}
