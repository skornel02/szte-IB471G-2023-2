import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    @Input()
    mobile: boolean = true;

    @Output()
    menuOpened = new EventEmitter();

    constructor() {}

    openMenu(): void {
        this.menuOpened.emit();
    }
}
