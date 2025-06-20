import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

export const layoutRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'containers',
                loadChildren: () => import('../garbage-containers/garbage-containers.routes').then(m => m.GarbageContainersRoutes)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'   
            }
        ] 
    }
]