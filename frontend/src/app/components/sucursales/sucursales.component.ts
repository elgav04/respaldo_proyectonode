import { Component, OnInit } from '@angular/core';
import {  sucursales } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
  providers: [DatePipe]
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

  constructor(private Data: DataService, private datePipe:DatePipe) { }

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

    imprimirPDF() {
  
      const doc = new jsPDF('landscape');
      doc.setFontSize(22);
      doc.text('Listado de sucursales Registradas', 90, 15, { align: 'center' });
      doc.setFontSize(16);
      doc.text(`Fecha de impresión: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}`, 90, 25, { align: 'center' });
    
      const tableData = this.TUser.map((sucursales: sucursales) => [
        sucursales.idsuc?.toString() || 'N/A',
        this.getNombreEmpresaPorId(sucursales.idempresa!) || 'N/A',
        sucursales.sucursal || 'N/A',
        sucursales.dirsuc || 'N/A',
        sucursales.telefono || 'N/A',       
        sucursales.estado || 'N/A'
      
      ]);
      
      
      import('jspdf-autotable').then((autoTable) => {
        
        autoTable.default(doc, {
          
          head: [['ID', 'EMPRESA','SUCURSAL','DIRECCIÓN','TELÉFONO','ESTADO']],
          body: tableData,
          startY: 35,
          margin: { left: 10 },
          styles: {
            fontSize: 8,
            cellPadding: 3,
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            overflow: 'ellipsize'
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 45 },
            2: { cellWidth: 45 },
            3: { cellWidth: 45 },
            4: { cellWidth: 45 },
            5: { cellWidth: 35 },
            6: { cellWidth: 23 },
          
            7: { cellWidth: 30 },
           
          },
          
          didDrawPage: (data) => {
            doc.setFontSize(10);
           
          }
        
        
        });
        
       
        doc.save('listado-sucursales.pdf');
        alert('Se ha generado el PDF');  
      });
    }
    
}
