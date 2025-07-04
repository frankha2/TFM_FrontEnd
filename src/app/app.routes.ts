import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
            },
            {
                path: 'smartcity',
                loadChildren: () => import('../app/layout/layout.routes').then(m => m.layoutRoutes)
            },
            {
                path: '**',
                redirectTo: 'auth'
            }
        ]
    }
    
];
