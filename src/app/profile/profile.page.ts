import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      let params = new HttpParams().set('path', this.user.profile_picture);
      this.http.get("https://api.ezraspberry.com/api/v1/User/getProfilePicture", { params: params }).subscribe((response: any) => {
        console.log(response);
      });

    });
  }


  disconnect() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }


}

