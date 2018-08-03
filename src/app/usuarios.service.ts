import { Usuario } from './shared/Usuario.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UsuariosService {

    constructor(private http: Http) { }

    public getUsuarios(): Promise<Usuario[]> {
        return  this.http.get('http://localhost:8080/users/u2')
            .toPromise()
            .then((resposta: any) => resposta.json())
            .catch((erro: any) => new Error('falha ao retornar'));
           // reject({erro: 404, mensagem: "recurso inexistente"})
    }
}
