import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from '../_services/index'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor(private router:Router,
    private authService:AuthenticationService,
    private route: ActivatedRoute,
    ) { }
  login:any={username:'',password:''};

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || '/';
  }
  
  OnLoginSubmit(){
    debugger;
    this.authService.login(this.login.username,this.login.password).
    pipe(first()).subscribe(data=>{
      this.router.navigate([this.returnUrl]);
    },error=>{
      console.log("error login");
    });
    
    // if(this.login.username=='admin' && this.login.password=="admin")
    // this.router.navigate(['/books']);
    // else{
    //   console.log("Password is wrong");
    // }
  }

}
