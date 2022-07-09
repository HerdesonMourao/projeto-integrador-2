import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { CardsComponent } from './views/cards/cards.component';
import { EditCardComponent } from './views/cards/edit-card/edit-card.component';
import { NewCardComponent } from './views/cards/new-card/new-card.component';
import { CategoryComponent } from './views/category/category.component';
import { EditCategoryComponent } from './views/category/edit-category/edit-category.component';
import { NewCategoryComponent } from './views/category/new-category/new-category.component';
import { EditExpenditureComponent } from './views/expenditure/edit-expenditure/edit-expenditure.component';
import { ExpenditureComponent } from './views/expenditure/expenditure.component';
import { NewExpenditureComponent } from './views/expenditure/new-expenditure/new-expenditure.component';
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
      },
      {
        path: `card`, component: CardsComponent
      },
      {
        path: `card/new`, component: NewCardComponent
      },
      {
        path: `card/edit/:id`, component: EditCardComponent
      },
      {
        path: `category`, component: CategoryComponent
      },
      {
        path: `category/mew`, component: NewCategoryComponent
      },
      {
        path: `category/edit/:id`, component: EditCategoryComponent
      },
      {
        path: `expenditure`, component: ExpenditureComponent
      },
      {
        path: `expenditure/new`, component: NewExpenditureComponent
      },
      {
        path: `expenditure/edit/:id`, component: EditExpenditureComponent
      },
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
