import { Injectable } from '@angular/core';
import { URL_API } from './app.api';
import { Pedido } from './shared/pedido.model';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) { }

    public  efetivarCompra(pedido: Pedido): Observable<number> {
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers })
        ).pipe(map((response: Response) => {
            console.log(response.json());
            return response.json().id;
        }));
      //  console.log('pedido: ', pedido);

    }
}
