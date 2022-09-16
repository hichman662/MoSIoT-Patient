/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { loginForm  } from '../interfaces/loginForm.interface';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { UserData } from '../models/userData.model';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  isLoggedIn = false;
  private token = '';
  private idEscenario: number ;
  private headers = new HttpHeaders;

private newUser: UserData = null;
constructor(private http: HttpClient,
               private router: Router,
               private storage: Storage) {

}

private getHeaderToken() {

  const header = {
      Authorization: this.getToken(),
  };

  const requestOptions = {
      headers: new HttpHeaders(header),
  };
  return requestOptions;
}

public getAllUsers(): Observable<object>{
  return this.http.get(`${environment.base_url}/User/ReadAll`);
}

public getAllUsersByIdEscenario(idEscenario: number): Observable<object>{
  return this.http.get(`${environment.base_url}/User/UsersScenario?idIoTScenario=${idEscenario}`);
}

public getUserById(idUser: number): Observable<object>{
  return this.http.get(`${environment.base_url}/User/${idUser}`);
}

public createUser( data: UserData ): Observable<object> {
  return this.http.post(`${environment.base_url}/User/New_`, data);
}

 login( formData: loginForm) {
  return this.http.post(`${environment.base_url}/PatientAnonimous/Login`, formData)
          .pipe(
            tap( (res: any) => {
              this.isLoggedIn = true;
              console.log(this.isLoggedIn);

              })
          );

}

/*  get headers() {
  return {
    headers: {
      'token': this.getToken
    }};
} */

getToken(): string {
  this.storage.get('token').then((val) => {
    this.token = val;
    console.log(this.token);
  });
  return this.token;
}

getIdEscenario(): number {

  return this.idEscenario;
}

setIdEscenario(id: number){
  this.idEscenario = id;
}



public getEscenarioByCliente(token: string): Observable<any>{

this.headers = new HttpHeaders ({'Authorization': token});
return this.http.post<any>(`${environment.base_url}/IoTScenario_Secure/DamePorPaciente`, null,{headers:this.headers});

}

get idNewUser(): number {
  return this.newUser.Id;
}

get nameNewUser(): string | undefined {
  return this.newUser.Surnames;
}

removeUserId(){
  this.newUser.Id = null;
}
removeUserName(){
  this.newUser.Surnames = null;
}

}
