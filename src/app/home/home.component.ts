import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../shared/Usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService, UsuariosService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
 // public usuarios: Usuario[];

  public loading = false;
  public vazio = false;

  constructor(private ofertasService: OfertasService, private usuariosServices: UsuariosService) { }

  ngOnInit() {
    this.loading = true;
    console.log('iniciou');
   this.ofertasService.getOfertas()
      .then((ofertas: Oferta[]) => {
         this.ofertas = ofertas;
         this.loading = false;
        },
      (param: any) => {
        console.log(param);
        this.loading = false;
      });

  /*  this.usuariosServices.getUsuarios()
      .then((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.loading = false;
        console.log('Usuários', this.usuarios);
      }, (param: any) => console.log('falhou ao retornar', param));*/
   /*   .catch( => {
        console.log('falhou ao retornar', param);
        this.usuarios = null;
        this.vazio = true;
        this.loading = false;
      });*/
    // console.log('lista de usuários', this.usuarios);
  }

}
