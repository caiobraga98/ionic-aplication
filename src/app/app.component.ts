import { DatabaseService } from './core/service/database.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.db.openDatabase();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "home",
        url   : "",
        icon  : "home"
      },
      {
        title : "cobertura",
        url   : "/contacts",
        icon  : "contacts"
      },
      {
        title : "especialidade",
        url   : "/especialidade",
        icon  : "contacts"
      },
      {
        title : "consulta",
        url   : "/consulta",
        icon  : "contacts"
      },
      {
        title : "medico",
        url   : "/medico",
        icon  : "contacts"
      }
    ]
  }
}
