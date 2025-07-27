import { Component, OnInit } from '@angular/core';
import {  tipoproducto } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-tipoproducto',
  templateUrl: './tipoproducto.component.html',
  styleUrls: ['./tipoproducto.component.css']
})
export class TipoproductoComponent implements OnInit  {
  TUser: any = [];
  user: tipoproducto = {
    idtpprod: null,
    idempresa: null,
    tipo: null,
    estado: 'Activo'
  }

  filterPost = '';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/tipoproducto')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idtpprod;   
    this.Data.save(this.user,'/tipoproducto')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/tipoproducto')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
