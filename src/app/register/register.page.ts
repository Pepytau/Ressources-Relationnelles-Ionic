import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.fb.group({
    mail: ['', Validators.required],
    alias: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let formData: FormData = new FormData();
    let myLogin: any = this.registerForm.value;

    let password = myLogin.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    formData.append('mail', myLogin.mail);
    formData.append('alias', myLogin.alias);
    formData.append('firstName', myLogin.firstName);
    formData.append('lastName', myLogin.lastName);
    formData.append('password', hash);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }
    this.http.post("http://ezraspberryapi.ddns.net/api/v1/Register", formData, httpOptions).subscribe((response: any) => {
      switch (response.code) {
        case '0001':
          this.router.navigate(['/login']);
          break;
        case '0099':

          alert('Une erreur s\'est produite, veuillez réessayer plus tard.');
          //this.router.navigate(['/tabs/']);
          break;
      }
    })
  }

}
