import { Routes } from "@angular/router";
import { OptimizedRoutesComponentPage } from "./pages/optimized-routes-page/optimized-routes-page.component";
import { ContainersListPageComponent } from "./pages/containers-list/containers-list.component";
import { SearchRoutePageComponent } from "./pages/search-route/search-route-page.component";

export const GarbageContainersRoutes: Routes = [
    {
        path: 'optimized-routes',
        component: OptimizedRoutesComponentPage
    },
    {
        path: 'manage',
        component: ContainersListPageComponent
    },
    {
        path: 'generate-route',
        component: SearchRoutePageComponent
    }
]