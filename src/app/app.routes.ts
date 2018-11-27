import { HomeComponent } from "./pages/home/home.component";
import { IndexComponent } from "./pages/home/index/index.component";

export class AppRoutes {
}

export const appRoutes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent },
    { path: 'index', component: IndexComponent },
    {
        path: 'permission',
        data: {preload: false},
        loadChildren: './pages/template/template.module#TemplateModule'
    },
    {
        path: 'user',
        data: {preload: false},
        loadChildren: './pages/user/user.module#UserModule'
    },
    {
        path: '**', component: IndexComponent
    }
]
