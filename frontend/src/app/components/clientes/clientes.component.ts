import { Component, OnInit } from '@angular/core';
import {  clientes } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  TUser: any = [];
  user: clientes = {
    num_clie: null,
    idempresa: null,
    idsuc: null,
    identidad: null,
    rtn: null,
    fecha_nac: null,
    nombre: null,
    telefono: null,
    direccion: null,
    correo: null,
    fecha_creacion: null,
    estado: 'Activo'
  }

  filterPost = '';

  Empresalist: any;  
  Sucursaleslist: any;  

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/clientes')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.num_clie;   
    this.Data.save(this.user,'/clientes')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}

  EliminarData(id: number){
    this.Data.delete(id, '/clientes')
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

  getDropListSucursal() {
    this.Data.getDropListSucursal().subscribe((data:any)=>{
      this.Sucursaleslist=data;
    })
  }

  getNombreEmpresaPorId(id: number): string {
    const empresa = this.Empresalist.find((emp: any) => emp.idempresa === id);
    return empresa ? empresa.nombre : 'Desconocida';
  }

  getNombreSucursalPorId(id: number): string {
    const sucursal = this.Sucursaleslist.find((emp: any) => emp.idsuc === id);
    return sucursal ? sucursal.sucursal : 'Desconocida';
  }


}
