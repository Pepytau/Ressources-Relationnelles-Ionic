import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RessourceDetailsPage } from '../ressource-details/ressource-details.page';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { baseUrl } from '../constants';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  comments = [];
  commentContent = '';

  constructor(
    @Inject(RessourceDetailsPage) private parent: RessourceDetailsPage,
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() { }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen = true) {
      let params = new HttpParams().set('ressourceId', this.parent.ressource.id);
      this.http.get(baseUrl + "/getRessourceComments", { params: params }).subscribe((response: any) => {
        this.comments = response;
      })
    }
  }

  sendComment() {
    let formData: FormData = new FormData();
    this.storage.get('user').then((myUser) => {
      formData.append('content', this.commentContent);
      formData.append('ressourceId', this.parent.ressource.id);
      formData.append('creator', myUser.alias);
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
        })
      }
      this.http.post(baseUrl + "/createComment", formData, httpOptions).subscribe(async (response: any) => {
        if (response.code == "0001") {
          const alert = await this.alertController.create({
            header: 'Succès !',
            message: 'Votre commentaire a bien été créé avec succès !',
            buttons: ['OK'],
          });
          await alert.present();
          this.commentContent = '';
          this.setOpen(true);
        }
      })
    });
  }

}
