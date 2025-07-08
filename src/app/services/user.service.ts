/* eslint-disable new-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable, throwError} from 'rxjs';
import { loginForm  } from '../interfaces/loginForm.interface';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Patient, UserData } from '../models/userData.model';
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

 login( formData: loginForm): Observable<any> {
  return this.http.post(`${environment.base_url}/PatientAnonimous/Login`, formData, {responseType: 'text'})
         .pipe(
            catchError((err: any) => {
              this.isLoggedIn = false;
              console.error(err);
              return throwError(err);

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



public getPatientId(token: string): Observable<Patient>{

this.headers = new HttpHeaders ({'Authorization': token});
return this.http.get<any>(`${environment.base_url}/Patient`, {headers:this.headers});

}

// Patient
public getAllPatient(token: string): Observable<object>{
  this.headers = new HttpHeaders ({'Authorization': token});
  return this.http.get(`${environment.base_url}/Patient/ReadAll`, {headers:this.headers});
}

public getPatientByIdScenario( uid: number, token: string): Observable<object>{
  this.headers = new HttpHeaders ({'Authorization': token});
  if (!uid) { uid = null; }
  return this.http.get <Patient>(`${environment.base_url}/Patient/PatientScenario?idIoTScenario=${uid}`, {headers:this.headers});
}

public getPatientByEmail( email: string, token: string): Observable<object>{
  this.headers = new HttpHeaders ({'Authorization': token});
  return this.http.get <Patient>(`${environment.base_url}/Patient/DamePorEmail?p_email=${email}`, {headers:this.headers} );
 }

public createPatient( data: Patient, token: string ): Observable<object> {
  this.headers = new HttpHeaders ({'Authorization': token});
  return this.http.post(`${environment.base_url}/Patient/New_`, data, {headers:this.headers});
}

// Assign Patient profile to patient
public assignPatientProfile(patientId: number, patientProfileId: number, token: string): Observable<object> {
  this.headers = new HttpHeaders ({'Authorization': token});
  // eslint-disable-next-line max-len
  return this.http.put(`${environment.base_url}/Patient/AssignPatientProfile?p_patient_oid=${patientId}&p_patientprofile_oid=${patientProfileId}`,{headers:this.headers});
}



get idNewUser(): number {
  return this.newUser.id;
}

get nameNewUser(): string | undefined {
  return this.newUser.surnames;
}

removeUserId(){
  this.newUser.id = null;
}
removeUserName(){
  this.newUser.surnames = null;
}

}
