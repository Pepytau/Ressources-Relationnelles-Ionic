import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen = true) {
      this.http.get("https://ezraspberryapi.ddns.net/api/v1/getRessourceComments").subscribe((response: any) => {
        console.log(response);
      })
    }
  }

}
