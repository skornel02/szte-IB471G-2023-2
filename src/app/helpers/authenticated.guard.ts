import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { RouterAuthService } from '../services/router-auth.service';
import { firstValueFrom } from 'rxjs';

export const authenticatedGuard: CanActivateFn = async (
    route,
    state
): Promise<boolean | UrlTree> => {
    const router = inject(Router);
    const auth = inject(RouterAuthService);

    const user = await auth.user;

    return user !== null || router.parseUrl('/login');
};
