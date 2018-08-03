import { Oferta } from './shared/oferta.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_API } from './app.api';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class OfertasService {

    constructor(private http: Http, private httpCliente: HttpClient) {}

    getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json().shift();
            });
    }

    getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().shift());
    }

    getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().shift());
    }

    pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(retry(3), map((retorno_pesquisa: Response) => retorno_pesquisa.json())
    );
        //    .subscribe((retorno_pesquisa) => retorno_pesquisa);
    }

    pesquisaOfertas3(): Observable<Oferta[]> {
        return  this.httpCliente.get<Oferta[]>(`${URL_API}/ofertas`);
    }

    pesquisaOfertasTop(termo: string): Observable<Oferta[]> {
        return this.httpCliente.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(2), map((retorno_pesquisa: Oferta[]) => retorno_pesquisa));
    }

    addHero (oferta: Oferta): Observable<Oferta> {
        console.log('vai inserir esta oferta: ', oferta);
        return this.httpCliente.post<Oferta>(`${URL_API}/ofertas`, oferta)
          .pipe(
          );
      }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
   /* getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            let deu_certo = true;
            if(deu_certo){
                setTimeout(() => resolve(this.ofertas), 3000);
                console.log('executou depois de 3')
            }else{
                reject({erro: 404, mensagem: "recurso inexistente"});
            }
        });
    }*/

}
