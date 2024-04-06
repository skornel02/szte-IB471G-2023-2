import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterSvgComponent } from "../../common/router-svg/router-svg.component";
import Interface from '../../data/interface';
import Bridge from '../../data/bridge';
import RouteEntry from '../../data/route-entry';
import { DatabaseService } from '../../services/database.service';
import { Subscription } from 'rxjs';
import Router from '../../data/router';
import { TimestampPipe } from "../../pipes/timestamp.pipe";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-router-details',
    standalone: true,
    templateUrl: './router-details.component.html',
    styleUrl: './router-details.component.css',
    imports: [
      RouterSvgComponent, 
      TimestampPipe,
      DatePipe,
    ]
})
export class RouterDetailsComponent implements OnInit, OnDestroy {
  private db: DatabaseService = inject(DatabaseService);

  @Input()
  routerId: string | null = null;

  interfaces: Interface[] | null = null;
  bridges: Bridge[] | null = null;
  routeEntries: RouteEntry[] | null = null;

  router: Router | null = null;
  interfaceSubscription: Subscription | null = null;
  bridgeSubscription: Subscription | null = null;
  routeEntrySubscription: Subscription | null = null;

  get loaded(): boolean {
    return this.interfaces !== null && this.bridges !== null && this.routeEntries !== null;
  }

  async ngOnInit() {
    console.log("Loading router details for router ID: ", this.routerId)

    if (this.routerId === null) {
      return;
    }

    const router = await this.db.getRouter(this.routerId);
    this.router = router.data() as Router;

    this.interfaceSubscription = this.db.getInterfaces(this.routerId).subscribe((interfaces) => {
      this.interfaces = interfaces;
    });
    
    this.bridgeSubscription = this.db.getBridges(this.routerId).subscribe((bridges) => {
      this.bridges = bridges;
    });

    this.routeEntrySubscription = this.db.getRouteEntries(this.routerId).subscribe((routeEntries) => {
      this.routeEntries = routeEntries;
    });
  }

  ngOnDestroy(): void {
    this.interfaceSubscription?.unsubscribe();
    this.bridgeSubscription?.unsubscribe();
    this.routeEntrySubscription?.unsubscribe();
  }

  async handleInterfaceClick(interfaceName: string) {
    console.log("Interface clicked: ", interfaceName);

    console.log(this.interfaces);
    console.log(this.bridges);
    console.log(this.routeEntries);

  }
}
