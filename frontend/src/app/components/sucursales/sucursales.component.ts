import { Component, OnInit } from '@angular/core';
import {  sucursales } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})

export class SucursalesComponent implements OnInit {

  TUser: any = [];
  user: sucursales = {
    idsuc:  null ,
    idempresa:  null ,
    sucursal: null,
    dirsuc: null,
    telefono: null,
    estado: 'Activo'
  }

  Empresalist: any;  

  filterPost = '';

  name = 'Sucursales.xlsx';

  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getDropListEmpresa();
  }

  getUser() {
    this.Data.getAll('/sucursales')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.idsuc;   
    this.Data.save(this.user,'/sucursales')
       .subscribe(
         res => {
          this.getUser();
        },
        err => console.error(err)
    );
}
  EliminarData(id: number){
    this.Data.delete(id, '/sucursales')
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

  exportToExcel(): void {
      let element = document.getElementById('tabla');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
      XLSX.writeFile(book, this.name);
    }
  
    public openPDF(): void {
      let DATA: any = document.getElementById('tabla');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('sucursales.pdf');
      });
    }
}
