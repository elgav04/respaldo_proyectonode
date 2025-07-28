import { Component, OnInit } from '@angular/core';
import {  formapago } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-formapago',
  templateUrl: './formapago.component.html',
  styleUrls: ['./formapago.component.css']
})
export class FormapagoComponent implements OnInit  {

  TUser: any = [];
  user: formapago = {
    idfpago: null,
    idempresa: null,
    formapago: null,
    estado: 'Activo'
  }

  filterPost = '';

  Empresalist: any;  

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/formapago')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idfpago;   
    this.Data.save(this.user,'/formapago')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/formapago')
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
