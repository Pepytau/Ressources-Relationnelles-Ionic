import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  ressources = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  search(searchText: any) {
    if (searchText.detail.value != "") {
      let params = new HttpParams().set('search', searchText.detail.value);
      this.http.get("https://ezraspberryapi.ddns.net/api/v1/searchRessource",
        { params: params }).subscribe((response: any) => {
          console.log(response)
          this.ressources = response;
        })
    }
  }

  getRessourceDetail(ressource: any) {
    this.router.navigate(['/ressource-details'], { queryParams: { 'id': ressource['id'] } })
  }

}
