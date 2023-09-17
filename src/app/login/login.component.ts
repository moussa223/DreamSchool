import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authservice:AuthService,private router:Router) { } // Injection

  ngOnInit(): void {
  }

  OnLogin():void{
    this.authservice.login()
  }
}