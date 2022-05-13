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
  token = '';

private newUser: UserData = new UserData(0, new Date(), '','','', '',false,1, false,'');
constructor(private http: HttpClient,
               private router: Router,
               private storage: Storage) {

}

public getAllUsers(): Observable<object>{
  return this.http.get(`${environment.base_url}/User/ReadAll`);
}

public createUser( data: UserData ): Observable<object> {
  return this.http.post(`${environment.base_url}/User/New_`, data)
  .pipe(
    tap((res: any)=>{
      const {Id ,BirhDate, Surnames, Address, Phone, Photo,IsActive, Type, IsDiseased,Email } = res;
      this.newUser = new UserData(Id ,BirhDate, Surnames, Address, Phone, Photo,IsActive, Type, IsDiseased,Email);
    })
  );
}

/* login( formData: loginForm) {
  return this.http.post(`${environment.base_url}/UserAnonimous/Login`, formData)
          .pipe(
            tap( (res: any) => {
              this.isLoggedIn = true;
              this.storage.set('token', res);
              })
          );
} */

/* get headers() {
  return {
    headers: {
      'token': this.getToken
    }};
}
get getToken(): string {
  this.storage.get('token').then((val) => {
    this.token = val;
  });
  return this.token || '';
} */

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
