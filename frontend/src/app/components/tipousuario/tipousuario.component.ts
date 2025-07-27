import { Component, OnInit } from '@angular/core';
import {  tipousuario } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-tipousuario',
  templateUrl: './tipousuario.component.html',
  styleUrls: ['./tipousuario.component.css']
})
export class TipousuarioComponent implements OnInit {
  TUser: any = [];
  user: tipousuario = {
    idtpusuario: null,
    idempresa: null,
    tipo: null,
    estado: 'Activo'
  }

  Empresalist: any;

  filterPost = '';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/tipousuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idtpusuario;   
    this.Data.save(this.user,'/tipousuario')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
  }

  EliminarData(id: number){
    this.Data.delete(id, '/tipousuario')
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
