import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let formData: FormData  = new FormData();
    let myLogin: any = this.registerForm.value;
    formData.append('mail',myLogin.mail);
    formData.append('alias',myLogin.mail);
    formData.append('firstName',myLogin.mail);
    formData.append('lastName',myLogin.mail);
    formData.append('password',myLogin.password );
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
      })
    }
    this.http.post("https://ezraspberryapi.ddns.net/api/v1/Register",formData,httpOptions).subscribe((response : any) => { 
      console.log(response);
     })
  }

}
