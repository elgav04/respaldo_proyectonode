import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
