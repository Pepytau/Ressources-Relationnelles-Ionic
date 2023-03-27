import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user = {
    mail: '',
    firstName: '',
    lastName: '',
    alias: ''
  }

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    await this.storage.get('user').then((myUser) => {
      if (myUser == null) {
        this.router.navigate(['/login']);
      }
    });
  }

  async ionViewDidEnter() {
    await this.storage.get('user').then((myUser) => {
      this.user = myUser;
      console.log(myUser)
      console.log(this.user)
    });
  }

  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

}
