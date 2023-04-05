import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourceDetailsPageRoutingModule } from './ressource-details-routing.module';

import { RessourceDetailsPage } from './ressource-details.page';

import { CommentsComponentModule } from '../comments/comments.module';

import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourceDetailsPageRoutingModule,
    CommentsComponentModule,
    QuillModule
  ],
  declarations: [RessourceDetailsPage]
})
export class RessourceDetailsPageModule { }
