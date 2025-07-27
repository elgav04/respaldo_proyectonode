import { Component, OnInit } from '@angular/core';
import {  usuario } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  TUser: any = [];
  user: usuario = {
    userid: null,
    idempresa: null,
    idsuc: null,
    idtpusuario: null,
    idemp: null,
    usuario: null,
    clave: null,
    tipo: null,
    estado: 'Activo'
  }

  filterPost = '';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/usuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.userid;   
    this.Data.save(this.user,'/usuario')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}

  EliminarData(id: number){
    this.Data.delete(id, '/usuario')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }

}
