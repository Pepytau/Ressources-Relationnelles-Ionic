import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
  }

  onSubmit() {
    let formData: FormData = new FormData();
    let myRessource: any = this.createForm.value;
    this.storage.get('user').then((myUser) => {
      this.user = myUser;
      formData.append('title', myRessource.title);
      formData.append('content', myRessource.content);
      formData.append('type', myRessource.type);
      formData.append('image', myRessource.image);
      formData.append('creator', this.user.alias);
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
        })
      }
      this.http.post("https://ezraspberryapi.ddns.net/api/v1/createRessource", formData, httpOptions).subscribe((response: any) => {
        console.log(response);
      })
    });
  }

  typeChange($event: any) {
    this.createForm.controls['type'].setValue($event.detail.value);
  }
}
