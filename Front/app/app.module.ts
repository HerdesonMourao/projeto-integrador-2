import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig} from 'ngx-mask';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { UserComponent } from './views/user/user.component';
import { NewUserComponent } from './views/user/new-user/new-user.component';
import { EditUserComponent } from './views/user/edit-user/edit-user.component';
import { RevenueComponent } from './views/revenue/revenue.component';
import { NewRevenueComponent } from './views/revenue/new-revenue/new-revenue.component';
import { EditRevenueComponent } from './views/revenue/edit-revenue/edit-revenue.component';
import { CardsComponent } from './views/cards/cards.component';
import { NewCardComponent } from './views/cards/new-card/new-card.component';
import { EditCardComponent } from './views/cards/edit-card/edit-card.component';
import { CategoryComponent } from './views/category/category.component';
import { NewCategoryComponent } from './views/category/new-category/new-category.component';
import { EditCategoryComponent } from './views/category/edit-category/edit-category.component';
import { ExpenditureComponent } from './views/expenditure/expenditure.component';
import { NewExpenditureComponent } from './views/expenditure/new-expenditure/new-expenditure.component';
import { EditExpenditureComponent } from './views/expenditure/edit-expenditure/edit-expenditure.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
}

const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align:"left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    UserDropdownMenuComponent,
    MenuSidebarComponent,
    LoginComponent,
    AppButtonComponent,
    UserComponent,
    NewUserComponent,
    EditUserComponent,
    RevenueComponent,
    NewRevenueComponent,
    EditRevenueComponent,
    CardsComponent,
    NewCardComponent,
    EditCardComponent,
    CategoryComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ExpenditureComponent,
    NewExpenditureComponent,
    EditExpenditureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule
  ],
  providers: [
    NgxMaskModule,
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
