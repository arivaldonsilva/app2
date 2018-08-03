import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../ofertas.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  comoUsar: string;

  constructor(private ofertaService: OfertasService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe((param: Params) => {
      this.ofertaService.getComoUsarOfertaPorId(param.id)
        .then((comoUsarGet: any) => this.comoUsar = comoUsarGet.descricao);
    });
  }

}
