import { Component, OnInit } from '@angular/core';
import {  sucursales } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})

export class SucursalesComponent implements OnInit {

  TUser: any = [];
  user: sucursales = {
    idsuc:  null ,
    idempresa:  null ,
    sucursal: null,
    dirsuc: null,
    telefono: null,
    estado: 'Activo'
  }

  Empresalist: any;  

  filterPost = '';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListEmpresa();
  }

  getUser() {
    this.Data.getAll('/sucursales')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idsuc;   
    this.Data.save(this.user,'/sucursales')
       .subscribe(
         res => {
          this.getUser();
        },
        err => console.error(err)
    );
}
  EliminarData(id: number){
    this.Data.delete(id, '/sucursales')
      .subscribe(
        res => {
          this.getUser();
        },
        err => console.error(err)
      );
  }

  getDropListEmpresa() {
    this.Data.getDropListEmpresa().subscribe((data:any)=>{
      this.Empresalist=data;
    })
  }

  getNombreEmpresaPorId(id: number): string {
    const empresa = this.Empresalist.find((emp: any) => emp.idempresa === id);
    return empresa ? empresa.nombre : 'Desconocida';
  }
}
