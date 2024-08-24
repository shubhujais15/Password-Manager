import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"password-manager-de6ca","appId":"1:911209794863:web:55b65569f915f1583465da","storageBucket":"password-manager-de6ca.appspot.com","apiKey":"AIzaSyC_HEBxDT_dFqLBHmoNYyi_0q7KHtjxc_M","authDomain":"password-manager-de6ca.firebaseapp.com","messagingSenderId":"911209794863"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
