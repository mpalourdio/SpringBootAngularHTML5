import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent : () => import('./first/components/first/first.component').then(m => m.FirstComponent)
    },
    {
        path: 'iam/a/very/long/url',
        loadComponent : () => import('./second/components/second/second.component').then(m => m.SecondComponent)

    },
    {
        path: '**',
        redirectTo: ''
    },
];
