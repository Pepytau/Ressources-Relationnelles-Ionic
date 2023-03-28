import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
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

  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  ressources = [];

  async ngOnInit() {
    await this.storage.get('user').then((myUser) => {
      // if (myUser == null) {
      //   this.router.navigate(['/login']);
      // }
      this.http.get("http://ezraspberryapi.ddns.net/api/v1/getRessourcesHeaders").subscribe((response: any) => {
        this.ressources = response;
      });
    });
  }

  async ionViewDidEnter() {
    await this.storage.get('user').then((myUser) => {
      this.user = myUser;
    });
  }

  getRessourceDetail(ressource: any) {
    this.router.navigate(['/ressource-details'], { queryParams: { 'id': ressource['id'] } })
  }
}
