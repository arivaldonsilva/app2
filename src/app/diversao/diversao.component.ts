import { Component, OnInit, Injectable } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService ]
})

export class DiversaoComponent implements OnInit {

  ofertasDiversao: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('diversao')
      .then((ofertasGet: Oferta[]) => {
        this.ofertasDiversao = ofertasGet;
        console.log(this.ofertasDiversao);
      },
    (param: any) => console.log(param));
  }

}
