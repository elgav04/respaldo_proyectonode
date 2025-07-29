import { Component, OnInit } from '@angular/core';
import { tipoproducto } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tipoproducto-edit',
  templateUrl: './tipoproducto-edit.component.html',
  styleUrls: ['./tipoproducto-edit.component.css']
})
export class TipoproductoEditComponent implements OnInit {
  valorInput: number | undefined;
  TUser: any = [];
  user: tipoproducto = {
    idtpprod: null,
    idempresa: null,
    tipo: null,
    estado: 'Activo'
  };

  Empresalist: any; 

  constructor(private Data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.getDropListEmpresa();
      this.Data.getOne(params['id'],'/tipoproducto')
        .subscribe(
          res => {
            this.user = res;
                                },
          err => console.log(err)
        );
    }
    }
    updateUser() {
      this.Data.update(this.user.idtpprod!, this.user,'/tipoproducto')
        .subscribe(
          res => {
            this.router.navigate(['/tipoproducto']);
          },
          err => console.error(err)
        );
    }  

    getDropListEmpresa() {
      this.Data.getDropListEmpresa().subscribe((data:any)=>{
        this.Empresalist=data;
      })
    }
  }
