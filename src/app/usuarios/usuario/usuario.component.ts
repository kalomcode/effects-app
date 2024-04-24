import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuario } from 'src/app/store/actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);

  usuario!: Usuario;
  loading: boolean = false;
  error: boolean = false;
  
  ngOnInit() {

    this.store.select('usuario').subscribe( ({user, loading, error}) => {
      this.usuario = user;
    })
    
    this.route.params.subscribe(({id}) => {
      this.store.dispatch(cargarUsuario({id}));
    })
  
  }

}
