import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@NgModule({
  providers: [
    PersonsService
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

  constructor(private userservice: PersonsService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(): void {
  }
}
