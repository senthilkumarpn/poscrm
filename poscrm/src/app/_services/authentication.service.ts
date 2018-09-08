import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http:HttpClient) { }
  login(username:string,password:string){

    //return this.http.post<any>(`/users/authenticate`,{username,password})
    return this.http.post<any>(`/authenticate`,{name:username,password})
    .pipe(map(user=>{
      debugger;
      if(user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }))
  }
  logout(){
    localStorage.removeItem("currentUser");
  }
}
