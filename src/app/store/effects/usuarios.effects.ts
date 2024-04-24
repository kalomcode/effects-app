import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import { of } from "rxjs";


@Injectable()
export class UsuariosEffects {

  private actions$ = inject(Actions);
  private usuarioSvc = inject(UsuarioService);

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType( cargarUsuarios ),
      exhaustMap(
        () => this.usuarioSvc.getUsers()
          .pipe(
            map( users => cargarUsuariosSuccess({usuarios: users})),
            catchError( err => of(cargarUsuariosError({payload: err})))
          )
      )
    )
  );

}