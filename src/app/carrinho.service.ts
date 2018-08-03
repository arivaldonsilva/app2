import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {

  itens: ItemCarrinho[] = [];

  exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItem(oferta: Oferta): void {
      const itemCarrinho: ItemCarrinho = new ItemCarrinho(
        oferta.id,
        oferta.imagens[0],
        oferta.titulo,
        oferta.descricao_oferta,
        oferta.valor,
        1
      );
      let itenCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
      if (itenCarrinhoEncontrado !== undefined) {
        itenCarrinhoEncontrado.quantidade += 1;
      } else {
        this.itens.push(itemCarrinho);
      }
      console.log(this.itens);

  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = 
      this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade += 1;
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = 
      this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade -= 1;
    }
  }
}

export { CarrinhoService };
