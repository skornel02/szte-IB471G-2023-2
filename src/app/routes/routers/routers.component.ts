import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { TimestampPipe } from '../../pipes/timestamp.pipe';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
        RouterModule,
    ],
    templateUrl: './routers.component.html',
    styleUrl: './routers.component.css',
})
export class RoutersComponent {
    $routers = this.db.$routers;

    constructor(private db: DatabaseService) {
        
    }
}
