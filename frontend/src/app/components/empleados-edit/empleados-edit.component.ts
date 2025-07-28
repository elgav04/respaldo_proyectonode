import { Component, OnInit } from '@angular/core';
import { empleados } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-empleados-edit',
  templateUrl: './empleados-edit.component.html',
  styleUrls: ['./empleados-edit.component.css']
})
export class EmpleadosEditComponent implements OnInit  {
  valorInput: number | undefined;
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
  };

  Empresalist: any;  
  Sucursaleslist: any; 
  AreastrabajoList: any;

  constructor(private Data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListAreastrabajo();
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.Data.getOne(params['id'],'/empleados')
        .subscribe(
          (res: any) => {
            const empleado: empleados = {
              ...res,
              femenino: !!res.femenino?.data?.[0],
              masculino: !!res.masculino?.data?.[0],
              soltero: !!res.soltero?.data?.[0],
              casado: !!res.casado?.data?.[0],
              unionlibre: !!res.unionlibre?.data?.[0]
            };
            this.user = empleado;
          },
          err => console.log(err)
        );
    }
    }
    updateUser() {
      this.Data.update(this.user.idemp!, this.user,'/empleados')
        .subscribe(
          res => {
            this.router.navigate(['/empleados']);
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
  }

