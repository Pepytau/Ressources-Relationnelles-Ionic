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

  user = {
    mail: '',
    firstName: '',
    lastName: '',
    alias: '',
    profile_picture: '',
  }

  constructor(private storage: Storage, private router: Router, private http: HttpClient,) { }
  async ngOnInit() {
    await this.storage.get('user').then((myUser) => {
      this.user = myUser;
      alert(this.user.profile_picture);
    });
  }

  disconnect() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }


}

