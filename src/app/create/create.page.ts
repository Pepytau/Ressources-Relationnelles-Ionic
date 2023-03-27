import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  createForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    type: ['', Validators.required],
    image: ['', Validators.required],
  })

  user = {
    mail: '',
    firstName: '',
    lastName: '',
    alias: ''
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private storage: Storage, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let formData: FormData = new FormData();
    let myRessource: any = this.createForm.value;
    this.storage.get('user').then((myUser) => {
      this.user = myUser;
      formData.append('title', myRessource.title);
      formData.append('type', myRessource.type);
      formData.append('content', myRessource.content);
      formData.append('imagePath', myRessource.image);
      formData.append('creator', this.user.alias);
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
        })
      }
      this.http.post("https://ezraspberryapi.ddns.net/api/v1/createRessource", formData, httpOptions).subscribe(async (response: any) => {
        if (response.code == "0001") {
          const alert = await this.alertController.create({
            header: 'Succès !',
            message: 'Votre ressource a bien été créée avec succès !',
            buttons: ['OK'],
          });

          await alert.present();
          this.router.navigate(['/tabs/menu'])
        }
      })
    });
  }

  typeChange($event: any) {
    this.createForm.controls['type'].setValue($event.detail.value);
  }
}
