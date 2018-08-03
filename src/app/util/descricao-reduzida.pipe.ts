import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'descricaoReduzida' })
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, tamanhoMax: number, inicio: number): string {
        if (texto.length > tamanhoMax) {
           return texto.substr(inicio, tamanhoMax) + '...';
        }
        return texto;
    }
}
