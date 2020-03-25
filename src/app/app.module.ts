import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './admin/header/header.component';
import {FooterComponent} from './admin/footer/footer.component';
import {SigninComponent} from './admin/signin/signin.component';
import {ListComponent} from './admin/list/list.component';
import {UtilisateurFormComponent} from './admin/utilisateur-form/utilisateur-form.component';
import {RandoFormComponent} from './admin/rando-form/rando-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {RandosService} from './services/randos.service';
import {CarteComponent} from './admin/carte/carte.component';
import {PageAdminComponent} from './admin/page-admin/page-admin.component';
import { UserComponent } from './admin/user/user.component';
import { SingleUserComponent } from './admin/single-user/single-user.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { ListRandoComponent } from './admin/list-rando/list-rando.component';
import { NewRandoComponent } from './admin/new-rando/new-rando.component';
import { SingleRandoComponent } from './admin/single-rando/single-rando.component';
import {UserService} from './services/user.service';
import {PersonsService} from './services/person.service';

const appRoutes: Routes = [
  {path: 'carte', component: CarteComponent},
  {path: 'auth', component: SigninComponent},
  {path: 'admin', component: PageAdminComponent},
  {path: 'rando', component: RandoFormComponent},
  {path: 'user', component: UtilisateurFormComponent},
  {path: 'test', component: UserComponent},
  {path: 'list', component: UserListComponent},
  {path: 'list/:id', component: SingleUserComponent},
  {path: 'list-rando/:id', component: SingleRandoComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'new-user/:id', component: NewUserComponent},
  {path: 'new-rando', component: NewRandoComponent},
  {path: 'list-rando', component: ListRandoComponent},
  {path: '', component: CarteComponent}
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
    CarteComponent,
    PageAdminComponent,
    UserComponent,
    SingleUserComponent,
    UserListComponent,
    NewUserComponent,
    ListRandoComponent,
    NewRandoComponent,
    SingleRandoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, RandosService, UserService, PersonsService, PageAdminComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
