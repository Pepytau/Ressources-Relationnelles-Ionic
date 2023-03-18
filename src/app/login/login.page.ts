import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.fb.group({
    mail: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    let formData: FormData  = new FormData();
    let myLogin: any = this.loginForm.value;
    formData.append('login',myLogin.mail);
    formData.append('password',myLogin.password );
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
      })
    }
    this.http.post("https://ezraspberryapi.ddns.net/api/v1/Login",formData,httpOptions).subscribe((response) => { console.log(response) })
  }

}
