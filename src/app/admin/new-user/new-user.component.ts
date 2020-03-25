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
    if (this.id) {
      this.userEdit = this.personsService.getSingleUser(this.id);
    } else {
      this.userEdit = new Personne(0, '', '', '' , '');
    }
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
        id: 0,
        name: ['', Validators.required],
        firstName: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitForm(id: number, name: string, firstName: string, mail: string, password: string) {
    const formValue = this.userForm.value;
    if (this.id) {
      this.personsService.updatePersonne(this.id, formValue.name, formValue.firstName, formValue.mail, formValue.password);
      this.router.navigate(['/list']);
    } else {
      const NewUser = new Personne(
        formValue.id = this.personsService.users[this.personsService.users.length - 1].id + 1,
        formValue.name,
        formValue.firstName,
        formValue.mail,
        formValue.password
      );

      this.personsService.addPersonne(NewUser);
      this.router.navigate(['/list']);
    }
  }
}
