import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Personne} from '../../models/personne.model';
import {PersonsService} from '../../services/person.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  id: number;
  userEdit: Personne;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private personsService: PersonsService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.initForm();
}

  initForm() {
    this.userForm = this.formBuilder.group({
        id: 0,
        nom: ['', Validators.required],
        prenom:  ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }
  onSubmitForm(id: number, nom: string, prenom: string, mail: string, password: string) {
    const formValue = this.userForm.value;

    console.log(formValue.id);
    if (formValue.id >= 0) {
        this.personsService.updateUtilisateur(formValue.id, formValue.nom, formValue.prenom, formValue.mail, formValue.password);
        this.router.navigate(['/list']);
        console.log('lol');
    } else {
      const NewUser = new Personne(
        formValue.id = this.personsService.users[this.personsService.users.length - 1].id + 1,
        formValue.nom,
        formValue.prenom,
        formValue.mail,
        formValue.password
      );
      console.log('lol2');
      this.personsService.addPersonne(NewUser);
      this.router.navigate(['/list']);
    }

  }
}
