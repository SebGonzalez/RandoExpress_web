import {Component, Input, NgModule, OnInit} from '@angular/core';
import {UserService} from '../../services/person.service';
import {Personne} from '../../models/personne.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@NgModule({
  providers: [
    UserService
  ]
})

export class UserComponent implements OnInit {

  @Input() nom: string;
  @Input() prenom: string;
  @Input() mail: string;
  @Input() password: string;
  @Input() id: number;

  isAuth = false;
  Personne: any;

  constructor(private userservice: UserService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(): void {
  }
}
