import { Component, OnInit } from '@angular/core';
import {  usuario } from 'src/app/interfaces/user';
import { DataService } from '../../services/data.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [DatePipe]
})
export class UsuarioComponent implements OnInit {
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
  }

  filterPost = '';
  Empresalist: any;  
  Sucursaleslist: any; 
  TipousuarioList: any;
  EmpleadoList: any;

  name = 'Usuarios.xlsx';

  constructor(private Data: DataService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getDropListEmpresa();
    this.getDropListSucursal();
    this.getDropListTipoUsuario();
    this.getDropListEmpleado();
    this.getUser();
  }
  getUser() {
    this.Data.getAll('/usuario')
      .subscribe(res => {
          this.TUser = res;
        
        }, err => console.error(err));
  }

  AgregarValor(){
    delete this.user.userid;   
    this.Data.save(this.user,'/usuario')
       .subscribe(
         res => {
          this.getUser();
         },
         err => console.error(err)
       );
}

  EliminarData(id: number){
    this.Data.delete(id, '/usuario')
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
  



  getNombreEmpresaPorId(id: number): string {
    const empresa = this.Empresalist.find((emp: any) => emp.idempresa === id);
    return empresa ? empresa.nombre : 'Desconocida';
  }

  getNombreSucursalPorId(id: number): string {
    const sucursal = this.Sucursaleslist.find((emp: any) => emp.idsuc === id);
    return sucursal ? sucursal.sucursal : 'Desconocida';
  }

  getTipousuarioPorId(id: number): string {
    const tipousuario = this.TipousuarioList.find((emp: any) => emp.idtpusuario === id);
    return tipousuario ? tipousuario.tipo : 'Desconocido';
  }

  getNombreEmpleadoPorId(id: number): string {
    const nombreempleado = this.EmpleadoList.find((emp: any) => emp.idemp === id);
    return nombreempleado ? nombreempleado.nombres + ' ' + nombreempleado.apellidos : 'Desconocido';
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
      PDF.save('usuarios.pdf');
    });
  }

  imprimirPDF() {
    
        const doc = new jsPDF('landscape');
        doc.setFontSize(22);
        doc.text('Listado de Usuarios Registrados', 90, 15, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`Fecha de impresión: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}`, 90, 25, { align: 'center' });
      
        const tableData = this.TUser.map((usuario: usuario) => [
          usuario.idsuc?.toString() || 'N/A',
          this.getNombreEmpresaPorId(usuario.idempresa!) || 'N/A',
          this.getNombreSucursalPorId(usuario.idsuc!) || 'N/A',
          this.getTipousuarioPorId(usuario.idtpusuario!) || 'N/A',
          this.getNombreEmpleadoPorId(usuario.idemp!) || 'N/A',
          usuario.usuario || 'N/A',
          usuario.clave || 'N/A',
          usuario.tipo || 'N/A',       
          usuario.estado || 'N/A'
        
        ]);
        
        
        import('jspdf-autotable').then((autoTable) => {
          
          autoTable.default(doc, {
            
            head: [['ID', 'EMPRESA','SUCURSAL','TIPO USUARIO','EMPLEADO','USUARIO','CLAVE','TIPO','ESTADO']],
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
          
         
          doc.save('listado-usuarios.pdf');
          alert('Se ha generado el PDF');  
        });
      }
}
