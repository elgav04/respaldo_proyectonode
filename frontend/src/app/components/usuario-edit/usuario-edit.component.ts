import { Component, OnInit } from '@angular/core';
import { usuario } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  valorInput: number | undefined;
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
  };

  Empresalist: any;  
  Sucursaleslist: any; 
  TipousuarioList: any;
  EmpleadoList: any;

  constructor(private Data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListTipoUsuario();
    this.getDropListEmpleado();
    
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.Data.getOne(params['id'],'/usuario')
        .subscribe(
          res => {
            this.user = res;
                                },
          err => console.log(err)
        );
    }
    }
    updateUser() {
      this.Data.update(this.user.userid!, this.user,'/usuario')
        .subscribe(
          res => {
            this.router.navigate(['/usuario']);
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
  }
