import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
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
    image: [''],
  })

  user = {
    mail: '',
    firstName: '',
    lastName: '',
    alias: ''
  }

  titleRequired = false;
  typeRequired = false;
  contentRequired = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private storage: Storage, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.errorControl.type.errors == null && this.errorControl.title.errors == null && this.errorControl.content.errors == null) {
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
        }, error => (console.log(error)))
      });
    } else {
      if (this.errorControl.type.errors != null) {
        this.typeRequired = true;
      }
      if (this.errorControl.title.errors != null) {
        this.titleRequired = true;
      }
      if (this.errorControl.content.errors != null) {
        this.contentRequired = true;
      }
    }
  }

  typeChange($event: any) {
    this.createForm.controls['type'].setValue($event.detail.value);
  }

  async imagePick() {
    const image = await Camera.pickImages({
      quality: 50,
      limit: 1
    })
    const response = await fetch(image.photos[0].webPath)
    const blob = await response.blob();
    this.createForm.value.image = await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  get errorControl() {
    return this.createForm.controls;
  }
}
