import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


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
    formData.append('password', myLogin.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }
    this.http.post("https://ezraspberryapi.ddns.net/api/v1/Login", formData, httpOptions).subscribe((response: any) => {
      console.log(response[0]);
      switch (response[0].code) {
        case '0001':
          let user = {
            mail: response[0].mail,
            alias: response[0].alias,
            firstName: response[0].firstName,
            lastName: response[0].lastName
          }
          this.storage.set('user', user);
          this.router.navigate(['/tabs/menu'])
          break;
        case '0002':
          alert('Mot de passe incorrect.');
          break;
        case '0003':
          alert('Aucun utilisateur n\'est enregistré avec cet e-mail.');
          break;
        case '0005':
          alert('Une erreur s\'est produite, veuillez réessayer plus tard.');
          break;
      }
    })
  }
}
