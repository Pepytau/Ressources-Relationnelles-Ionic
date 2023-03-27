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

  ressources = [];

  constructor(private storage: Storage, private http: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.http.get("https://ezraspberryapi.ddns.net/api/v1/getRessourcesHeaders").subscribe((response: any) => {
      this.ressources = response;
    })
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
