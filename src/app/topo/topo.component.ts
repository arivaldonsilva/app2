import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, catchError, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  public ofertasTop: Observable<Oferta[]>;
  headers: string[];
  oferendas: Oferta[];
  ofertaA: Oferta;
 // ofertas2: Oferta[];

  private subjectPesquisa = new Subject<string>();

  constructor(private ofertaService: OfertasService) {  }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((tm: string) => {
          console.log('requisicao enviada');
          if (tm.trim() === '') {
            return of<Oferta[]>([]);
        }
          return this.ofertaService.pesquisaOfertas(tm);
        }),
        catchError((erro) => {
          console.log(erro);
          return of<Oferta[]>([]);
        }));

    /*this.ofertas.subscribe((ofertas: Oferta[]) => {
      this.ofertas2 = ofertas;
      console.log(ofertas);
    });*/
    /*this.ofertaA = this.buscaUltimaOferta();
    console.log(this.ofertaA);*/
  }
  /*public buscaUltimaOferta(): Oferta {
    let oferta: Oferta;
    this.ofertas = this.ofertaService.pesquisaOfertasTop('');
    this.ofertas.subscribe((of: Oferta[]) => {
      oferta = of[1];
      oferta.id = of.length + 2;
      oferta.titulo = oferta.id + ' : ' + oferta.titulo;
      console.log('construindo oferta: ', oferta);
    });
    return oferta;
  }*/

  public addOferta(): void {
    // let ofertaInserir = this.buscaUltimaOferta();
    console.log('saco viu', this.ofertaA);
   /* this.ofertaService.addHero(this.ofertaA$)
    .subscribe(hero => console.log('Oferta adicionada: ', hero));*/
    // console.log(oferta);
  }

  public pesquisa(termo: string): void {
    this.ofertas = this.ofertaService.pesquisaOfertas(termo);
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Status do erro: ', erro.status),
      () => console.log('Execucao concluida')
    );
   // console.log(this.ofertas);
  }

  public pesquisaS(termo: string): void {
    console.log('keyup caracter ', termo);
    this.subjectPesquisa.next(termo);
  }

  showConfigResponse(termo: string): void {
    this.ofertaService.pesquisaOfertasTop(termo)
      // resp is of type `HttpResponse<Config>`
      .subscribe((resp: Oferta[]) => { console.log('e na pesquisa top: ', resp); });
  }

  public limpaPesquisa() {
    this.pesquisaS('');
  }

}
