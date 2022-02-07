import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: []
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
