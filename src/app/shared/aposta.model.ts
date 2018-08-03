import { Bolao } from './bolao.model';
import { Observador } from './observador.model';

export class Aposta {
    id: number;
    palpites: number[];
    id_bolao: Bolao;
    id_apostador: Observador;
}
