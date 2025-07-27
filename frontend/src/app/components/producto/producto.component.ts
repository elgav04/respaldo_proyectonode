import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  TUser: any = [];
  user: producto = {
    num_prod: null,
    idempresa: null,
    idsuc: null,
    idtpprod: null,
    descripcionprod: null,
    presentacion: null,
    marca: null,
    valor: null,
    precioventa: null,
    existencia: null,
    fecha_ingreso: null,
    fecha_actualiza: null,
    estado: 'Activo'
  }

  filterPost = '';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.Data.getAll('/producto')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.num_prod;   
    this.Data.save(this.user,'/producto')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/producto')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }
}
