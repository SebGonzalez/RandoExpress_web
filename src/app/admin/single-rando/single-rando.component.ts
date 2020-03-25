import { Component, OnInit } from '@angular/core';
import {RandosService} from '../../services/randos.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-rando',
  templateUrl: './single-rando.component.html',
  styleUrls: ['./single-rando.component.css']
})
export class SingleRandoComponent implements OnInit {

  nom = 'nom';
  ville = 'prenom';
  description = 'description';
  dateDepart = 'dateDepart';
  heureDepart = 'heureDepart';
  longitude = 'longitude';
  lattitude = 'lattitude';

  constructor(private userService: RandosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.nom = this.userService.getRandoById(+id).name;
    this.ville = this.userService.getRandoById(+id).ville;
    this.description = this.userService.getRandoById(+id).description;
    this.dateDepart = this.userService.getRandoById(+id).dateDepart;
    this.heureDepart = this.userService.getRandoById(+id).heureDepart;
    this.longitude = this.userService.getRandoById(+id).longitude;
    this.lattitude = this.userService.getRandoById(+id).latitude;
  }

}
