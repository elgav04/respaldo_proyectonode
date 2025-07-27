import { Component,OnInit } from '@angular/core';
import { areas_trabajo } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-areas-trabajo-edit',
  templateUrl: './areas-trabajo-edit.component.html',
  styleUrls: ['./areas-trabajo-edit.component.css']
})
export class AreasTrabajoEditComponent implements OnInit  {
  valorInput: number | undefined;
  TUser: any = [];
  user: areas_trabajo = {
    idarea: null,
    idempresa: null,
    idsuc: null,
    area: null,
    fecha_creacion: null,
    estado: 'Activo'
  };
  constructor(private Data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.Data.getOne(params['id'],'/areas_trabajo')
        .subscribe(
          res => {
            this.user = res;
                                },
          err => console.log(err)
        );
    }
    }
    updateUser() {
      this.Data.update(this.user.idarea!, this.user,'/areas_trabajo')
        .subscribe(
          res => {
            this.router.navigate(['/areas_trabajo']);
          },
          err => console.error(err)
        );
    }  
  }

