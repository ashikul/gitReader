import {Component} from "@angular/core";
import Highlightjs from "highlightjs";
import {Http} from "@angular/http";
import {GithubProvider} from "../../providers/github";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // constructor(public navCtrl: NavController, public highlightjs: Highlightjs) {
  //   console.log('constructor');
  //   console.log(highlightjs);
  // }

  vm = this;
  myString = '<button ion-button secondary menuToggle>Toggle Menu</button>';
  projectURL = 'https://api.github.com/repos/ashikul/githubskimmer';
  projectTreeURL = this.projectURL + '/git/trees/master?recursive=1';
  blobURL = this.projectURL + '/git/blobs/';
  profile;
  name = '';

  constructor(public http: Http, public github: GithubProvider,) {
    // console.log('constructor');
    // console.log(Highlightjs);

    //TODO: prolly move this somewhere on INIT
    Highlightjs.initHighlightingOnLoad();
    // console.log(this.projectTreeURL);
    // console.log(this.blobURL);


    this.name = this.github.getName();
    // this.github.getData().subscribe(response => (this.profile = response));
    this.github.getData().subscribe(this.handleProjectData); //this works
    console.log(this.profile);

    // console.log(this.profile);
    // this.loadUser();

  }

  handleProjectData(response: Response) {
    console.log('handleProjectData');
    console.log(response);
    this.profile = response;
    console.log('this.profile');
    console.log(this.profile);
    return response;
  }

  // loadUser() {
  //   this.http.get(this.projectTreeURL).subscribe(data => this.profile = data);
  // }


}
//TODO: add github api
//TODO: fix formatting...
//TODO: fix formatting... specially for huge code blocks

//TODO: its not wrapping? need line breaks or something
//TODO: might need to lazy init with hljs.highlightBlock(block)
//TODO: webworkers
