import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-routers',
    standalone: true,
    imports: [
        AsyncPipe
    ],
    templateUrl: './routers.component.html',
    styleUrl: './routers.component.css',
})
export class RoutersComponent {
    $routers = this.db.$routers;

    constructor(private db: DatabaseService) {
        
    }
}
