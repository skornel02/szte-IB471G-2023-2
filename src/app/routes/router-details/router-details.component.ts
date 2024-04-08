import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterSvgComponent } from '../../common/router-svg/router-svg.component';
import Interface from '../../data/interface';
import Bridge from '../../data/bridge';
import RouteEntry from '../../data/route-entry';
import { DatabaseService } from '../../services/database.service';
import { Subscription } from 'rxjs';
import Router from '../../data/router';
import { TimestampPipe } from '../../pipes/timestamp.pipe';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-router-details',
    standalone: true,
    templateUrl: './router-details.component.html',
    styleUrl: './router-details.component.css',
    imports: [RouterSvgComponent, TimestampPipe, DatePipe, MatButtonModule, MatTableModule],
})
export class RouterDetailsComponent implements OnInit, OnDestroy {
    private db: DatabaseService = inject(DatabaseService);

    @Input()
    routerId: string | null = null;

    interfaces: Interface[] = null!;
    bridges: Bridge[] = null!;
    routeEntries: RouteEntry[] = null!;

    router: Router | null = null;
    interfaceSubscription: Subscription | null = null;
    bridgeSubscription: Subscription | null = null;
    routeEntrySubscription: Subscription | null = null;

    selectedInterface: Interface | null = null;

    get loaded(): boolean {
        return this.interfaces !== null && this.bridges !== null && this.routeEntries !== null;
    }

    async ngOnInit() {
        await this.reloadRouter();

        if (this.routerId === null) {
            return;
        }

        this.interfaceSubscription = this.db.getInterfaces(this.routerId).subscribe(interfaces => {
            this.interfaces = interfaces;
        });

        this.bridgeSubscription = this.db.getBridges(this.routerId).subscribe(bridges => {
            this.bridges = bridges;
        });

        this.routeEntrySubscription = this.db
            .getRouteEntries(this.routerId)
            .subscribe(routeEntries => {
                this.routeEntries = routeEntries;
            });
    }

    async reloadRouter() {
        console.log('Loading router details for router ID: ', this.routerId);

        if (this.routerId === null) {
            return;
        }

        const router = await this.db.getRouter(this.routerId);
        this.router = router.data() as Router;
    }

    ngOnDestroy(): void {
        this.interfaceSubscription?.unsubscribe();
        this.bridgeSubscription?.unsubscribe();
        this.routeEntrySubscription?.unsubscribe();
    }

    async handleInterfaceClick(interfaceName: string) {
        console.log('Interface clicked: ', interfaceName);

        console.log(this.interfaces);
        console.log(this.bridges);
        console.log(this.routeEntries);

        this.selectedInterface = this.interfaces?.filter(_ => _.name == interfaceName)[0] ?? null;
        console.log('Selected interface: ', this.selectedInterface);
    }

    async togglePower() {
        await this.db.toggleRouterPower(this.routerId!);
        await this.reloadRouter();
    }
}
