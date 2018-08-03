import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})

export class OfertaComponent implements OnInit, OnDestroy {

  /*private tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;*/

  oferta: Oferta;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, 
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.route.params.subscribe((parametro: Params) => {
      this.ofertasService.getOfertaPorId(parametro.id)
      .then(ofertaGet => {
        this.oferta = ofertaGet;
      },
      (param: any) => console.log(param));
    });

   // console.log('oferta component', this.carrinhoService.exibirItens());
      /*
      this.route.params.subscribe(
        (parametro: any) => console.log('mudou o parametro', parametro),
        (erro: any) => console.log(erro),
        () => console.log('concluindo observer')
      );
      */
/*
    let tempo = interval(2000);

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => console.log('aqui é 2000', intervalo));


    let meuObservableTeste = Observable.create(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
        observer.next(4);
      }
    );
    this.meuObservableTesteSubscription =  meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado * 10),
      (erro: string) => console.log(erro),
      () => console.log('finalizou stream')
    );*/
  }

  ngOnDestroy() {
    /*
    this.tempoObservableSubscription.unsubscribe();
    this.meuObservableTesteSubscription.unsubscribe();
    */
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
  }

}
