import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourceDetailsPageRoutingModule } from './ressource-details-routing.module';

import { RessourceDetailsPage } from './ressource-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourceDetailsPageRoutingModule
  ],
  declarations: [RessourceDetailsPage]
})
export class RessourceDetailsPageModule {}
