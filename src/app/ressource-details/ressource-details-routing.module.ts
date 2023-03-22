import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RessourceDetailsPage } from './ressource-details.page';

const routes: Routes = [
  {
    path: '',
    component: RessourceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RessourceDetailsPageRoutingModule {}
