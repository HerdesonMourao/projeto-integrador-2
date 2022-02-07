import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { AppButtonComponent } from './components/app-button/app-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    UserDropdownMenuComponent,
    MenuSidebarComponent,
    LoginComponent,
    AppButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
