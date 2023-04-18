import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  keyboardUp: boolean = false;

  constructor(private platform: Platform) {
    this.platform.keyboardDidShow.subscribe((ev: { keyboardHeight: any; }) => {
      const { keyboardHeight } = ev;
      this.keyboardUp = true;
    });

    this.platform.keyboardDidHide.subscribe(() => {
      this.keyboardUp = false
    });
  }

}
