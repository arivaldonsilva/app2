import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  ondeFica: string;

  constructor(private ofertaService: OfertasService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe((param: Params) => {
      this.ofertaService.getOndeFicaOfertaPorId(param.id)
      .then((ondeFicaGet: any) => this.ondeFica = ondeFicaGet.descricao);
    });
  }

}
