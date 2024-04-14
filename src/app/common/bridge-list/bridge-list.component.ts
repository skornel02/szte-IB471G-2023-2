import { Component, Input } from '@angular/core';
import Bridge from '../../data/bridge';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import Interface from '../../data/interface';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { CreateBridgeComponent } from '../forms/create-bridge/create-bridge.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
    selector: 'app-bridge-list',
    standalone: true,
    imports: [MatButtonModule, MatTableModule, MatIconModule],
    templateUrl: './bridge-list.component.html',
    styleUrl: './bridge-list.component.css',
})
export class BridgeListComponent {
    @Input()
    routerId: string = null!;

    @Input()
    bridgeList: Bridge[] = null!;

    @Input()
    interfaceList: Interface[] = null!;

    constructor(
        private db: DatabaseService,
        private dialog: Dialog
    ) {}

    interfaceCount(bridge: Bridge): number {
        if (!bridge.virtualInterface.path) return 0;

        const interfaces = this.interfaceList?.filter(
            i => i.master?.path === bridge.virtualInterface.path
        );
        return interfaces?.length ?? 0;
    }

    async deleteBridge(bridge: Bridge) {
        console.log('Deleting bridge', bridge);

        await this.db.deleteBridge(this.routerId, bridge);
    }

    openDialog() {
        // material cdk dialog

        const dialogRef = this.dialog.open(CreateBridgeComponent, {
            data: {
                routerId: this.routerId,
            },
        });
    }
}
