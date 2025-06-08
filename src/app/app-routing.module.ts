import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { LayoutComponent } from './components/container/layout/layout.component';

const routes: Routes = [
  {
   path: '',
    component: LayoutComponent,
    children: [
  {
    path: '',
    loadChildren: () =>
      import('./components/diceShop/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./components/admin/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      )
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/diceShop/pages/pages.module').then(
        (m) => m.PagesModule
      )
  },
  {
    path: 'views',
    loadChildren: () =>
      import('./components/diceShop/views/views.module').then(
        (m) => m.ViewsModule
      )
  },
]
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
