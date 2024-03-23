import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(
            provideFirebaseApp(() =>
                initializeApp({
                    projectId: 'router-ui-szte',
                    appId: '1:943762268884:web:840df8a7be533095651141',
                    storageBucket: 'router-ui-szte.appspot.com',
                    apiKey: 'AIzaSyAsGwKQ2cx8wh1heALDReFdpBQjpVYlrVo',
                    authDomain: 'router-ui-szte.firebaseapp.com',
                    messagingSenderId: '943762268884',
                })
            )
        ),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        provideAnimationsAsync(),
        provideToastr(),
    ],
};
