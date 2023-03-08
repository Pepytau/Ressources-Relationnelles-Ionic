import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  connect() {
    this.http.get("http://ezraspberryapi.ddns.net/api/v1/login")
  }

}
