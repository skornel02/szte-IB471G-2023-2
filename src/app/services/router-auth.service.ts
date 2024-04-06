import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RouterAuthService implements OnDestroy {
    private auth: Auth = inject(Auth);
    private userSubscription: Subscription;

    user$ = user(this.auth);

    constructor() {
        this.userSubscription = this.user$.subscribe(this.handleUserUpdate);
    }

    get user (): Promise<User | null>{
        return firstValueFrom(this.user$);
    }

    handleUserUpdate(user: User | null) {
        console.log("User changed to: ", user?.email ?? "-");
        console.log(user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    logout() {
        this.auth.signOut();
    }
}
