import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { SigninComponent } from './admin/signin/signin.component';
import { ListComponent } from './admin/list/list.component';
import { UtilisateurFormComponent } from './admin/utilisateur-form/utilisateur-form.component';
import { RandoFormComponent } from './admin/rando-form/rando-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {PersonnesService} from './services/personnes.service';
import {RandosService} from './services/randos.service';
import { CarteComponent } from './admin/carte/carte.component';

const appRoutes: Routes = [
  { path: 'carte', component: CarteComponent },
  { path: 'auth', component: SigninComponent },
  { path: '', component: CarteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    ListComponent,
    UtilisateurFormComponent,
    RandoFormComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, PersonnesService, RandosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
