import { Component, OnInit } from '@angular/core';
import {  empleados } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  TUser: any = [];
  user: empleados = {
    idemp: null,
    idempresa: null,
    idsuc: null,
    idarea: null,
    identidad: null,
    fecha_nac: null,
    nombres: null,
    apellidos: null,
    femenino: null,
    masculino: null,
    soltero: null,
    casado: null,
    unionlibre: null,
    direccion: null,
    fecha_creacion: null,
    estado: 'Activo'
  }

  filterPost = '';

  Empresalist: any;  
  Sucursaleslist: any; 
  AreastrabajoList: any;
  
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListAreastrabajo();
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/empleados')
      .subscribe(res => {
        const empleadosTransform: empleados[] = (res as any[]).map((user: any) => ({
          ...user,
          femenino: !!user.femenino?.data?.[0],
          masculino: !!user.masculino?.data?.[0],
          soltero: !!user.soltero?.data?.[0],
          casado: !!user.casado?.data?.[0],
          unionlibre: !!user.unionlibre?.data?.[0],
        }));
        
        this.TUser = empleadosTransform;
        console.log(this.TUser);
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idemp;   
    this.Data.save(this.user,'/empleados')
       .subscribe(
         res => {

this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/empleados')
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

  getDropListAreastrabajo() {
    this.Data.getDropListAreastrabajo().subscribe((data:any)=>{
      this.AreastrabajoList=data;
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

  getAreastrabajoPorId(id: number): string {
    const areastabajo = this.AreastrabajoList.find((emp: any) => emp.idarea === id);
    return areastabajo ? areastabajo.area : 'Desconocida';
  }



}
