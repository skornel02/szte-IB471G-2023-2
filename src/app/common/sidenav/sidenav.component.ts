import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { RouterAuthService } from '../../services/router-auth.service';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [AsyncPipe, JsonPipe, MatButtonModule, MatListModule, RouterModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnDestroy {
    private userSubscription: Subscription;
    user: User | null = null;

    constructor(auth: RouterAuthService) {
        this.userSubscription = auth.user$.subscribe(user => (this.user = user));
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
