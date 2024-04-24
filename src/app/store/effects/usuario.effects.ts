import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { of } from "rxjs";


@Injectable()
export class UsuarioEffects {

  private actions$ = inject(Actions);
  private usuarioSvc = inject(UsuarioService);

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType( cargarUsuario ),
      exhaustMap(
        action => this.usuarioSvc.getUserById(action.id)
          .pipe(
            map( users => cargarUsuarioSuccess({usuario: users})),
            catchError( err => of(cargarUsuarioError({payload: err})))
          )
      )
    )
  );

}