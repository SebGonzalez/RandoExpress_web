import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './commun/header/header.component';
import {FooterComponent} from './commun/footer/footer.component';
import {SigninComponent} from './commun/signin/signin.component';
import {UtilisateurFormComponent} from './admin/utilisateur-form/utilisateur-form.component';
import {RandoFormComponent} from './admin/rando-form/rando-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {RandosService} from './services/randos.service';
import {CarteComponent} from './client/carte/carte.component';
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
  {path: 'admin/auth', component: SigninComponent},
  {path: 'admin', canActivate: [AuthGuardService], component: PageAdminComponent},
  {path: 'rando', canActivate: [AuthGuardService], component: RandoFormComponent},
  {path: 'user', canActivate: [AuthGuardService], component: UtilisateurFormComponent},
  {path: 'list', canActivate: [AuthGuardService], component: UserListComponent},
  {path: 'list/:id', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: 'list-rando/:id', canActivate: [AuthGuardService], component: SingleRandoComponent},
  {path: 'new-user', canActivate: [AuthGuardService], component: NewUserComponent},
  {path: 'new-user/:id', canActivate: [AuthGuardService], component: NewUserComponent},
  {path: 'new-rando', canActivate: [AuthGuardService], component: NewRandoComponent},
  {path: 'new-rando/:id', canActivate: [AuthGuardService], component: NewRandoComponent},
  {path: 'list-rando', canActivate: [AuthGuardService], component: ListRandoComponent},
  {path: '', canActivate: [AuthGuardService], component: PageAdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
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
  providers: [AuthGuardService, RandosService, UserService, PersonsService, PageAdminComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
