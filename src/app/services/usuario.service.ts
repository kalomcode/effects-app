import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://reqres.in/api';

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get(`${this.url}/users?per_page=6&delay=3`)
            .pipe(
              map( (resp:any) => resp['data'])
            )
  }

  getUserById( id: string ) {
    return this.http.get(`${this.url}/users/${id}`)
            .pipe(
              map( (resp:any) => resp['data'])
            )
  }
  
}
