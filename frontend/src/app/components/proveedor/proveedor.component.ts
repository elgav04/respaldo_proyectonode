import { Component,OnInit } from '@angular/core';
import {  proveedor } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  TUser: any = [];
  user: proveedor = {
    idprov:  null ,
    idempresa: null,
    proveedor: null,
    direccion: null,
    telefono: null,
    responsable: null,
    fecha_creacion: null,
    observaciones: null,
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
    this.Data.getAll('/proveedor')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idprov;   
    this.Data.save(this.user,'/proveedor')
       .subscribe(
         res => {
           this.getUser();
        },
          err => console.error(err)
        );
  
  }

  EliminarData(id: number){
    this.Data.delete(id, '/proveedor')
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
