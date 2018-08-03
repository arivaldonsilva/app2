import { Sorteio } from './shared/sorteio.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SorteiosService {

    constructor(private http: Http) { }

    getSorteios(): Promise<Sorteio[]> {
        return this.http.get('http://localhost:3000/sorteios')
            .toPromise()
            .then((resposta: any) => resposta.json());
    }
}
