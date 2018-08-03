import { Component, OnInit } from '@angular/core';
import { BolaoService } from '../bolao.service';
import { SorteiosService } from '../sorteios.service';
import { Observador } from '../shared/observador.model';
import { Bolao } from '../shared/bolao.model';
import { Sorteio } from '../shared/sorteio.model';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.css'],
  providers: [ SorteiosService, BolaoService ]
})

export class SorteioComponent implements OnInit {
  public sorteios: Sorteio[];
  public boloes: Bolao[];

  public observador = new Observador();

  constructor(private sorteiosService: SorteiosService, private bolaoService: BolaoService) { }

  ngOnInit() {
    this.observador.id = 3;
    this.observador.role = 'Apostador';
    this.observador.name = 'Xororó';

    this.sorteiosService.getSorteios()
    .then((sorteios: Sorteio[]) => {
      this.sorteios = sorteios;
      console.log('Usuários', this.sorteios);
    })
    .catch((param: any) => {
      console.log(param);
    });
    this.bolaoService.getBoloes()
      .then((bolaos: Bolao[]) => {
      this.boloes = bolaos;
    })
    .catch((param: any) => {
      console.log(param);
    });
  }

}
