import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  ressources = [];

  constructor(private storage: Storage, private http: HttpClient) { }

  async ngOnInit() {
    this.http.get("https://ezraspberryapi.ddns.net/api/v1/getRessourcesHeader").subscribe((response: any) => {
      this.ressources = response;
      console.log(this.ressources);
    })
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
