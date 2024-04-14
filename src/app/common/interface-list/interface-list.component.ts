import { Component, EventEmitter, Input, Output } from '@angular/core';
import Interface from '../../data/interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-interface-list',
    standalone: true,
    imports: [MatTableModule, MatButtonModule],
    templateUrl: './interface-list.component.html',
    styleUrl: './interface-list.component.css',
})
export class InterfaceListComponent {
    @Input()
    routerId: string = null!;

    @Input()
    interfaceList: Interface[] = null!;

    @Input()
    selectedInterface: Interface | null = null;

    @Output()
    interfaceClick = new EventEmitter<string>();

    handleInterfaceClick(name: string) {
        this.interfaceClick.emit(name);
    }
}
