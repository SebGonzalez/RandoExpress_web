import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})

export class CarteComponent implements OnInit {
  title = 'randoExpress';
  Ez = 'Facile';
  Midle = 'Moyenne';

  ngOnInit() {

    // tslint:disable-next-line:no-unused-expression

    // Déclaration de la carte avec les coordonnées du centre
    const myfrugalmap = L.map('frugalmap').locate({setView: true, maxZoom: 16});
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    const ImageEz = L.icon({
      iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png'
    });

    const ImageMidle = L.icon({
      iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-orange.png'
    });

    // Les différents endroits que l'on a marqué
    L.marker([43.227462, 5.4381482], {icon: ImageMidle})
      .bindPopup('<h5>La rando de Bouclema</h5><br>Difficulté : Moyenne').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 5.4381482], {icon: ImageEz})
      .bindPopup('<h5><b>La randodo</b></h5><br>Difficulté : Facile').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 6.4381482], {icon: ImageEz})
      .bindPopup('<h5><b>La randodo</b></h5><br>Difficulté : Facile').addTo(myfrugalmap).openPopup();
    L.marker([44.227462, 6], {icon: ImageMidle})
      .bindPopup('<h5><b>La rando de Bouclema</b></h5><br>Difficulté : Moyenne').addTo(myfrugalmap).openPopup();

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // Géolocalisation sur la carte avec affichage du rayon
    function onLocationFound(e) {
      const radius = e.accuracy;

      L.marker(e.latlng).addTo(myfrugalmap)
        .bindPopup('<b>Vous êtes ici !').openPopup();

      L.circle(e.latlng, 20000).addTo(myfrugalmap);
    }

    myfrugalmap.on('locationfound', onLocationFound);
  }
  getDifficulte() {
    return this.Ez;
  }
}


