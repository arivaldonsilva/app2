import { Bolao } from './bolao.model';

export class Sorteio {
    public id: number; // identificador do sorteio
    public data: Date; // data/horario do sorteio
    public resultados: number[]; // numeros sorteados
    public id_bolao: Bolao;
}
