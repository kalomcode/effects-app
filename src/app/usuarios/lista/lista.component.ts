import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {
  
  private usuariosSvc = inject(UsuarioService);
  private store = inject(Store<AppState>);

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;
  
  ngOnInit() {

    this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    })

    this.store.dispatch( cargarUsuarios() );

    // this.usuariosSvc.getUsers().subscribe(users => {
    //   console.log(users);
    //   this.usuarios = users
    // });
    
  }

}
