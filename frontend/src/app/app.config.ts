import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import firebase from "firebase/compat/app";
import {AuthInterceptor} from "./auth/auth.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

const firebaseConfig = {
  apiKey: "AIzaSyBKfykj2U4ApI06sRmwS2QXDGiwZV3NYsY",
  authDomain: "softjourn-practice.firebaseapp.com",
  projectId: "softjourn-practice",
  storageBucket: "softjourn-practice.appspot.com",
  messagingSenderId: "225291519899",
  appId: "1:225291519899:web:24c002bcf9abbe52eb833e",
  measurementId: "G-YKQ9KH1ZBJ"
};

firebase.initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    )
  ]
};

