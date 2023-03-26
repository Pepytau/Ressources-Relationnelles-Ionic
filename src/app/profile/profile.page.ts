import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

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
    alias: ''
  }

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.storage.get('user').then((myUser) => {
      this.user = myUser;
    });
  }


  disconnect() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
