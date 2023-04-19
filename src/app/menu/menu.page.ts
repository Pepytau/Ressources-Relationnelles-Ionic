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

  breakpoints = {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  }
  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  ressources = [];

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.storage.get('user').then((myUser) => {
      this.user = myUser;
      this.http.get("https://api.ezraspberry.com/api/v1/getRessourcesHeaders").subscribe((response: any) => {
        this.ressources = response;
      });
    });
  }

  getRessourceDetail(ressource: any) {
    this.router.navigate(['/ressource-details'], { queryParams: { 'id': ressource['id'] } })
  }
}
