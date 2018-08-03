import { Component, OnInit, Injectable } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})

export class RestaurantesComponent implements OnInit {

  ofertasRestaurante: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
      .then((ofertasRetorno: Oferta[]) => {
         this.ofertasRestaurante = ofertasRetorno;
        console.log('ofertas de restaurante', this.ofertasRestaurante);
    },
    (param: any) => {
      console.log(param);
    });
  }

}
