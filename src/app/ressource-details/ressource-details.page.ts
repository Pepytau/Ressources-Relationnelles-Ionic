import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.page.html',
  styleUrls: ['./ressource-details.page.scss'],
})
export class RessourceDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ressource: any = {};

  ngOnInit() {
    let id: any;
    this.route.queryParamMap
      .subscribe((params) => {
        id = params
        id = id.params.id
      });
    let params = new HttpParams().set('id', id);
    this.http.get("https://ezraspberryapi.ddns.net/api/v1/Ressource", { params: params }).subscribe((response: any) => {
      this.ressource = response;
    })

  }
}
