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
  Empresalist: any;  
  Sucursaleslist: any; 
  TipousuarioList: any;
  EmpleadoList: any;

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListTipoUsuario();
    this.getDropListEmpleado();
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

  getDropListTipoUsuario() {
    this.Data.getDropListTipoUsuario().subscribe((data:any)=>{
      this.TipousuarioList=data;
    })
  }

  getDropListEmpleado() {
    this.Data.getDropListEmpleado().subscribe((data:any)=>{
      this.EmpleadoList=data;
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

  getTipousuarioPorId(id: number): string {
    const tipousuario = this.TipousuarioList.find((emp: any) => emp.idtpusuario === id);
    return tipousuario ? tipousuario.tipo : 'Desconocido';
  }

  getNombreEmpleadoPorId(id: number): string {
    const nombreempleado = this.EmpleadoList.find((emp: any) => emp.idemp === id);
    return nombreempleado ? nombreempleado.nombres + ' ' + nombreempleado.apellidos : 'Desconocido';
  }
}
