import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      console.log(this.ressources);
    })
  }

  async ionViewDidEnter() {
    await this.storage.get('user').then((myUser) => {
      this.user = myUser;
    });
  }

  getRessourceDetail(ressource: any) {
    console.log(ressource['id']);
    this.router.navigate(['/ressource-details'], { queryParams: { 'id': ressource['id'] } })
  }

  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

}
