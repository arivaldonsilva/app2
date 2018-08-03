import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    'numero': new FormControl(null,  [ Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'complemento': new FormControl(),
    'formaPagamento': new FormControl(null,  [ Validators.required])});

  idPedido: number;
  public itensCarrinho: ItemCarrinho[];

  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    // console.log('fefe fe fe fef ', this.carrinhoService.exibirItens());
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    } else {
      const f = this.formulario;
      const pedido = new Pedido(f.get('endereco').value, f.get('numero').value, f.get('complemento').value, f.get('formaPagamento').value);
      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((id: number) => {
           this.idPedido = id;
           console.log('id do pedido: ', id);
          });
    }
  }

  public totalCarrinhoCompras(): number {
    let total = 0;

    this.itensCarrinho.map((item: ItemCarrinho) => total += item.valor * item.quantidade);

    return total;
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
}
