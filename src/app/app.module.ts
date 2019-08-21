import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MaterialModule } from './material/material.module';
import {SharedModule} from './shared/shared.module';
import {HomeComponent} from'./home/home.component';
import {LayoutComponent} from'./layout/layout.component';
//import {FlexLayoutModule} from '@angular/flex-layout';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {OwnerModule} from'./owner/owner.module';
import {UserModule} from './user/user.module';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutingModule,
    HttpClientModule,
    OwnerModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
