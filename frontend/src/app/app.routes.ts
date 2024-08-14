import {Route} from '@angular/router';
import {authGuard} from "./auth/auth.guard";
import {isSignedInGuard} from "./auth/is-signed-in.guard";

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard | Practice'
  },
  {
    path: 'events',
    loadComponent: () => import('./events/events.component').then(m => m.EventsComponent),
    title: 'Events | Practice',
    canActivate: [authGuard],
  },
  {
    path: 'events/create',
    loadComponent: () => import('./events/create-event/create-event.component').then(m => m.CreateEventComponent),
    title: 'Create Event | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'events/edit/:id',
    loadComponent: () => import('./events/edit-event/edit-event.component').then(m => m.EditEventComponent),
    title: 'Edit Event | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Reports | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'inbox',
    loadComponent: () => import('./messenger/messenger.component').then(m => m.MessengerComponent),
    title: 'Inbox | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'media',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Media | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    title: 'Users | Practice',
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
    title: 'Settings | Practice'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    title: 'Log In | Practice',
    canActivate: [isSignedInGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Sign Up | Practice',
    canActivate: [isSignedInGuard]
  }
];
