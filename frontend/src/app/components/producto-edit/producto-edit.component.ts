import { Component, OnInit } from '@angular/core';
import { producto } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  valorInput: number | undefined;
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
  };

  Empresalist: any;  
  Sucursaleslist: any;  
  Tipoproductolist: any;

  constructor(private Data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListTipoproducto();

    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.Data.getOne(params['id'],'/producto')
        .subscribe(
          res => {
            this.user = res;
                                },
          err => console.log(err)
        );
    }
    }

    updateUser() {
      this.Data.update(this.user.num_prod!, this.user,'/producto')
        .subscribe(
          res => {
            this.router.navigate(['/producto']);
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
  
    getDropListTipoproducto() {
      this.Data.getDropListTipoProducto().subscribe((data:any)=>{
        this.Tipoproductolist=data;
      })
    }
  }
