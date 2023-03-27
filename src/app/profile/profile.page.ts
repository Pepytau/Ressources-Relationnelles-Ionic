import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.get('user').then((myUser) => {
      console.log(myUser);
      if (myUser == null) {
        this.router.navigate(['tabs/menu']);
      }
    });
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  };
}

