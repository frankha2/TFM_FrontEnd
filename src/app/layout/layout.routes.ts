import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const layoutRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'   
            }
        ] 
    }
]