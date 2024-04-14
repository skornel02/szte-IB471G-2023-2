import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterAuthService } from '../../services/router-auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
    constructor(
        private auth: RouterAuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.auth.logout();

        this.router.navigate(['/routers']);
    }
}
