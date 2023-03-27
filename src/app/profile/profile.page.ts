import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {
    mail: '',
    firstName: '',
    lastName: '',
    alias: ''
  }

  constructor(private storage: Storage, private router: Router, private http: HttpClient,) { }

  async ngOnInit() {

  }

  disconnect() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }


}

