import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
// import {Highlightjs} from "highlightjs";
import Highlightjs from 'highlightjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // constructor(public navCtrl: NavController, public highlightjs: Highlightjs) {
  //   console.log('constructor');
  //   console.log(highlightjs);
  // }

  myString = '<button ion-button secondary menuToggle>Toggle Menu</button>';

  constructor(public navCtrl: NavController ) {
    console.log('constructor');
    console.log(Highlightjs);

    //TODO: prolly move this somewhere on INIT
    Highlightjs.initHighlightingOnLoad();

  }





}
