import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {
  
  private usuariosSvc = inject(UsuarioService);
  usuarios: Usuario[] = [];
  
  ngOnInit() {

    this.usuariosSvc.getUsers().subscribe(users => {
      console.log(users);
      this.usuarios = users
    });
    
  }

}
