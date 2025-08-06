import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [DatePipe]
})
export class ProductoComponent implements OnInit {
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
  }

  filterPost = '';

  Empresalist: any;  
  Sucursaleslist: any;  
  Tipoproductolist: any;

  name = 'Productos.xlsx';

  constructor(private Data: DataService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListTipoproducto();

    this.getUser();
  }

  getUser() {
    this.Data.getAll('/producto')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.num_prod;   
    this.Data.save(this.user,'/producto')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}
  EliminarData(id: number){
    this.Data.delete(id, '/producto')
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

  getDropListTipoproducto() {
    this.Data.getDropListTipoProducto().subscribe((data:any)=>{
      this.Tipoproductolist=data;
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

  getTipoproductoPorId(id: number): string {
    const tipoproducto = this.Tipoproductolist.find((emp: any) => emp.idtpprod === id);
    return tipoproducto ? tipoproducto.tipo : 'Desconocido';
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
      PDF.save('productos.pdf');
    });
  }

  imprimirPDF() {
    
        const doc = new jsPDF('landscape');
        doc.setFontSize(22);
        doc.text('Listado de Productos Registrados', 90, 15, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Fecha de impresión: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}`, 90, 25, { align: 'center' });
      
        const tableData = this.TUser.map((productos: producto) => [
          productos.idsuc?.toString() || 'N/A',
          this.getNombreEmpresaPorId(productos.idempresa!) || 'N/A',
          this.getNombreSucursalPorId(productos.idsuc!) || 'N/A',
          this.getTipoproductoPorId(productos.idtpprod!) || 'N/A',
          productos.descripcionprod || 'N/A',
          productos.presentacion || 'N/A',
          productos.marca || 'N/A',       
          productos.valor || 'N/A',
          productos.precioventa || 'N/A',   
          productos.existencia || 'N/A',   
          productos.fecha_ingreso || 'N/A',   
          productos.fecha_actualiza || 'N/A',   
          productos.estado || 'N/A'  
        ]);
        
        
        import('jspdf-autotable').then((autoTable) => {
          
          autoTable.default(doc, {
            
            head: [['ID', 'EMPRESA','SUCURSAL','TIPO PRODUCTO','DESCRIPCIÓN','PRESENTACIÓN','MARCA','VALOR','PRECIO VENTA','EXISTENCIA','FECHA INGRESO','FECHA ACTUALIZACIÓN','ESTADO']],
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
          
         
          doc.save('listado-productos.pdf');
          alert('Se ha generado el PDF');  
        });
      }
}
