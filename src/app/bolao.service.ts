import { Bolao } from './shared/bolao.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BolaoService {

    constructor(private http: Http) { }

    getBoloes(): Promise<Bolao[]> {
        return this.http.get('http://localhost:3000/bolao')
            .toPromise()
            .then((resposta: any) => resposta.json());
    }
}
