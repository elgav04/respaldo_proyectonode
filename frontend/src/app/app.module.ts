import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { EmpresaEditComponent } from './components/empresa-edit/empresa-edit.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SucursalesEditComponent } from './components/sucursales-edit/sucursales-edit.component';
import { ProveedorEditComponent } from './components/proveedor-edit/proveedor-edit.component';
import { AreasTrabajoComponent } from './components/areas-trabajo/areas-trabajo.component';
import { AreasTrabajoEditComponent } from './components/areas-trabajo-edit/areas-trabajo-edit.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { TipousuarioEditComponent } from './components/tipousuario-edit/tipousuario-edit.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientesEditComponent } from './components/clientes-edit/clientes-edit.component';
import { TipoproductoComponent } from './components/tipoproducto/tipoproducto.component';
import { TipoproductoEditComponent } from './components/tipoproducto-edit/tipoproducto-edit.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { FormapagoComponent } from './components/formapago/formapago.component';
import { FormapagoEditComponent } from './components/formapago-edit/formapago-edit.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadosEditComponent } from './components/empleados-edit/empleados-edit.component';
import { FilterempresaPipe } from './pipes/filterempresa.pipe';
import { FiltersucursalesPipe } from './pipes/filtersucursales.pipe';
import { FilterproveedorPipe } from './pipes/filterproveedor.pipe';
import { FilterareasTrabajoPipe } from './pipes/filterareas-trabajo.pipe';
import { FilterempleadosPipe } from './pipes/filterempleados.pipe';
import { FiltertipousuarioPipe } from './pipes/filtertipousuario.pipe';
import { FilterusuarioPipe } from './pipes/filterusuario.pipe';
import { FilterclientesPipe } from './pipes/filterclientes.pipe';
import { FiltertipoproductoPipe } from './pipes/filtertipoproducto.pipe';
import { FilterproductoPipe } from './pipes/filterproducto.pipe';
import { FilterformapagoPipe } from './pipes/filterformapago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    SucursalesComponent,
    ProveedorComponent,
    EmpresaEditComponent,
    NavegacionComponent,
    SucursalesEditComponent,
    ProveedorEditComponent,
    AreasTrabajoComponent,
    AreasTrabajoEditComponent,
    TipousuarioComponent,
    TipousuarioEditComponent,
    UsuarioComponent,
    UsuarioEditComponent,
    ClientesComponent,
    ClientesEditComponent,
    TipoproductoComponent,
    TipoproductoEditComponent,
    ProductoComponent,
    ProductoEditComponent,
    FormapagoComponent,
    FormapagoEditComponent,
    EmpleadosComponent,
    EmpleadosEditComponent,
    FilterempresaPipe,
    FiltersucursalesPipe,
    FilterproveedorPipe,
    FilterareasTrabajoPipe,
    FilterempleadosPipe,
    FiltertipousuarioPipe,
    FilterusuarioPipe,
    FilterclientesPipe,
    FiltertipoproductoPipe,
    FilterproductoPipe,
    FilterformapagoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
