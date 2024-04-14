import { Component, Input } from '@angular/core';
import RouteEntry from '../../data/route-entry';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-route-list',
    standalone: true,
    imports: [MatTableModule, MatButtonModule],
    templateUrl: './route-list.component.html',
    styleUrl: './route-list.component.css',
})
export class RouteListComponent {
    @Input()
    routerId: string = null!;

    @Input()
    routeList: RouteEntry[] = null!;
}
