import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RandosService} from '../../services/randos.service';
import {Router} from '@angular/router';
import {Personne} from '../../models/personne.model';
import {Rando} from '../../models/rando.model';

@Component({
  selector: 'app-new-rando',
  templateUrl: './new-rando.component.html',
  styleUrls: ['./new-rando.component.css']
})
export class NewRandoComponent implements OnInit {

  randoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private randoService: RandosService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.randoForm = this.formBuilder.group({
        id: 0,
        ville: ['', Validators.required],
        nom: ['', Validators.required],
        description: ['', Validators.required],
        longitude: ['', Validators.required],
        lattitude: ['', Validators.required],
        dateDepart: ['', Validators.required],
        heureDepart: ['', Validators.required]
      }
    );
  }
  onSubmitForm() {
    const formValue = this.randoForm.value;
    // @ts-ignore
    const NewRando = new Rando(
      formValue.id = this.randoService.randonne[this.randoService.randonne.length - 1].id + 1,
      formValue.nom,
      formValue.ville,
      formValue.description,
      formValue.longitude,
      formValue.lattitude,
      formValue.dateDepart,
      formValue.heureDepart
    );
    this.randoService.addRando(NewRando);
    this.router.navigate(['/list-rando']);
  }
}
