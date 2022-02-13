import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { EditRevenueComponent } from './views/revenue/edit-revenue/edit-revenue.component';
import { NewRevenueComponent } from './views/revenue/new-revenue/new-revenue.component';
import { RevenueComponent } from './views/revenue/revenue.component';
import { EditUserComponent } from './views/user/edit-user/edit-user.component';
import { NewUserComponent } from './views/user/new-user/new-user.component';
import { UserComponent } from './views/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user', component: UserComponent
      },
      {
        path: 'user/new', component: NewUserComponent
      },
      {
        path: 'user/edit/:id', component: EditUserComponent
      },
      {
        path: 'revenue', component: RevenueComponent
      },
      {
        path: `revenue/new`, component: NewRevenueComponent
      },
      {
        path: `revenue/edit/:id`, component: EditRevenueComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
