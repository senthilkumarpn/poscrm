import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {

  constructor(private router:Router,private route:ActivatedRouteSnapshot,private authService:AuthService) { }
 canActivate():boolean{
  const expectedRole = this.route.data.expectedRole;
  const token = localStorage.getItem("jwtToken");
  const tokenPayload = decode(token);
  if(!this.authService.isAuthenticated() || tokenPayload.expectedRole !== expectedRole ){
    this.router.navigate(['login']);
    return false;
  }
  return true;
 }
}
