import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { TimestampPipe } from '../../pipes/timestamp.pipe';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CreateRouterComponent } from '../../common/forms/create-router/create-router.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
    selector: 'app-routers',
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        DatePipe,
        TimestampPipe,
        MatListModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatMenuModule,
        RouterModule,
        DialogModule,
    ],
    templateUrl: './routers.component.html',
    styleUrl: './routers.component.css',
})
export class RoutersComponent {
    $routers = this.db.$routers;

    constructor(
        private db: DatabaseService,
        private dialog: Dialog
    ) {}

    async createRouter() {
        console.log('Create router');
        const ref = this.dialog.open(CreateRouterComponent, {});

        const result = await ref.closed.toPromise();

        console.log('Result: ', result);
    }

    async deleteRouter(routerId: string) {
        if (!confirm('Are you sure you want to delete this router?')) {
            return;
        }
        
        console.log('Delete router: ', routerId);
        await this.db.deleteRouter(routerId);
    }
}
