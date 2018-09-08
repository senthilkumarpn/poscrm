import { Injectable } from '@angular/core';

import {JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwt:JwtHelperService) { }
  public isAuthenticated():boolean{
    var token = localStorage.getItem("jwtToken");

    return token && !this.jwt.isTokenExpired(token);
  }
}
