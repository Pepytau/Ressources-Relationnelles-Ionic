import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.page.html',
  styleUrls: ['./ressource-details.page.scss'],
})
export class RessourceDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) { }

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
      this.ressource.contenu = this.sanitizer.bypassSecurityTrustHtml(this.ressource.contenu)
      params.delete('id');
      params = new HttpParams().set('ressourceId', this.ressource.id);
      this.http.get("https://ezraspberryapi.ddns.net/api/v1/getRessourceComments", { params: params }).subscribe((comments: any) => {
      })
    })
  }
}
