import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';
//TODO login bcrypt
//https://www.npmjs.com/package/bcryptjs

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

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.get('user').then((myUser) => {
      if (myUser != null) {
        this.router.navigate(['/tabs/menu'])
      }
    });
  }

  onSubmit() {
    let formData: FormData = new FormData();
    let myLogin: any = this.loginForm.value;
    formData.append('login', myLogin.mail);
    //formData.append('password', myLogin.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }
    this.http.post("http://192.168.1.72/api/v1/Login", formData, httpOptions).subscribe((response: any) => {
      switch (response.code) {
        case '0001':
          let pwd = response.password;

          if (bcrypt.compareSync(myLogin.password, pwd)) {
            this.http.get("http://192.168.1.72/api/v1/User?mail=" + myLogin.mail, httpOptions).subscribe((response: any) => {

              let user = {
                mail: response.mail,
                alias: response.alias,
                firstName: response.firstName,
                lastName: response.lastName
              }
              this.storage.set('user', user);
              this.router.navigate(['/tabs/menu']);
            });
          } else {
            alert("Mot de passe incorrect");
          }
          break;
        case '0099':
          alert(response.message);
          break;
        default:
          alert("Wow wtf ?");
      }
    })
  }
}
