import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmpresaEditComponent} from './components/empresa-edit/empresa-edit.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { SucursalesEditComponent} from './components/sucursales-edit/sucursales-edit.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProveedorEditComponent } from './components/proveedor-edit/proveedor-edit.component';
import { AreasTrabajoComponent } from './components/areas-trabajo/areas-trabajo.component';
import { AreasTrabajoEditComponent } from './components/areas-trabajo-edit/areas-trabajo-edit.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadosEditComponent } from './components/empleados-edit/empleados-edit.component';
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

import { NavegacionComponent} from './components/navegacion/navegacion.component';

import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from '././guards/role.guard';

import { NoAutorizadoComponent } from './components/no-autorizado/no-autorizado.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'no-autorizado',
    component:NoAutorizadoComponent
  },
  {
    path: 'navegacion',
    component:NavegacionComponent
  },
  {
    path: 'empresa',
    component :EmpresaComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2]  }
  },
  {
    path: 'empresa/edit/:id',
    component :EmpresaEditComponent
  },
  {
    path: 'sucursales',
    component :SucursalesComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2,3]  }
  },
  {
    path: 'sucursales/edit/:id',
    component :SucursalesEditComponent
  },
  {
    path: 'proveedor',
    component :ProveedorComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2]  }
  },
  {
    path: 'proveedor/edit/:id',
    component :ProveedorEditComponent
  },
  {
    path: 'areas_trabajo',
    component :AreasTrabajoComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
  {
    path: 'areas_trabajo/edit/:id',
    component :AreasTrabajoEditComponent
  },
  {
    path: 'empleados',
    component :EmpleadosComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
  {
    path: 'empleados/edit/:id',
    component :EmpleadosEditComponent
  },
  {
    path: 'tipousuario',
    component :TipousuarioComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
  {
    path: 'tipousuario/edit/:id',
    component :TipousuarioEditComponent
  },
  {
    path: 'usuario',
    component :UsuarioComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
  {
    path: 'usuario/edit/:id',
    component :UsuarioEditComponent
  },
  {
    path: 'clientes',
    component :ClientesComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2]  }
  },
  {
    path: 'clientes/edit/:id',
    component :ClientesEditComponent
  },
  {
    path: 'tipoproducto',
    component :TipoproductoComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2]  }
  },
  {
    path: 'tipoproducto/edit/:id',
    component :TipoproductoEditComponent
  },
  {
    path: 'producto',
    component :ProductoComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1,2,3]  }
  },
  {
    path: 'producto/edit/:id',
    component :ProductoEditComponent
  },
  {
    path: 'formapago',
    component :FormapagoComponent,
    canActivate:  [RoleGuard] ,data: { roles: [1]  }
  },
  {
    path: 'formapago/edit/:id',
    component :FormapagoEditComponent
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Ruta para manejar rutas no definidas
  {
    path: '**',
    redirectTo: '/login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}


