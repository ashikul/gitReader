import {Component, ViewChildren} from "@angular/core";
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
  projectURL = 'https://api.github.com/repos/creationix/js-github';
  projectTreeURL = this.projectURL + '/git/trees/master?recursive=1';
  blobURL = this.projectURL + '/git/blobs/';
  profile;
  projectFiles;
  name = '';
  fontSize;


  constructor(public http: Http, public github: GithubProvider,) {

    //TODO: prolly move this somewhere on INIT

  }

//
// {
//   "path": "gulp_tasks/karma.js",
//   "mode": "100644",
//   "type": "blob",
//   "sha": "98aaf1d44c3ba4d8be79602475f641b911b34c31",
//   "size": 777,
//   "url": "https://api.github.com/repos/ashikul/githubskimmer/git/blobs/98aaf1d44c3ba4d8be79602475f641b911b34c31"
// },

  // https://raw.githubusercontent.com/ashikul/githubskimmer/master/src/routes.js
  ngOnInit() {

    // Highlightjs.initHighlightingOnLoad();

    // console.log(Highlightjs);
    // console.log(Highlightjs.getLanguage('javascript'));
    // console.log(this.projectTreeURL);
    // console.log(this.blobURL);


    this.github.getName().then(nameFromStorage => {
      this.name = nameFromStorage;
    });
    // this.github.getData().subscribe(response => (this.profile = response));
    // this.projectFiles = this.github.getData().subscribe(this.handleProjectData);


    //we'll save this in the future
    this.projectFiles = this.github.getDataCached(this.projectTreeURL).map(data => {

      // /[a-zA-Z\_][a-zA-Z0-9\_]*/g

      //path
      //type
      let projectFileObjects = [];
      // let fileExtensionRegex = /(?:\.([^.]+))?$/;

      //
      // data.tree[2].map(file => { //why doens this work?
      data.tree.forEach(file => {

          let rawCodeString;
          // console.log(file);

        // if (file.type === "blob") {
        //   var fileExtension = file.path.split('.').pop();
        //   console.log(fileExtension);
        //
        // }


          //TODO: what about no nblobs??
          // if (file.type === "blob") {
          if (file.type === "blob") { //testing one file
            this.github.getRawCodeCached(file.url).subscribe(codeString => {
              rawCodeString = codeString;
              // console.log('getRawCodeCached RESPONSE');
              // console.log(codeString);

              // console.log('rawCodeString');
              // console.log('rawCodeString');
              // console.log(rawCodeString);

              //TODO: reference this code block
              //TODO: parse value...
              //TODO: file type check..
              // let test;
              // test = Highlightjs.highlight('javascript', rawCodeString);
              //
              // console.log('test');
              // console.log(test);
              // file.code = test.value;
              var fileExtension = file.path.split('.').pop();
              file.language = fileExtension;
              file.code = rawCodeString;
              projectFileObjects.push(file);
              // data.code =
              // console.log('FILE');
              // console.log(file.path);
              // console.log(codeString.substring(0, 10));
              // projectFileObjects.push(file)
            });
          }


          // console.log(file.path);
          // console.log(rawCodeString);

          // projectFileObjects.push(file);
          // console.log(file);
        }
      );


      // console.log('data');
      // console.log(data);
      console.log('done');

      console.log('post-processing1');
      // console.log(projectFileObjects);


      // let codeBlocks1 = document.getElementsByClassName("code-block");
      // console.log(codeBlocks1.length);

      return projectFileObjects;
      //TODO: apply post semantic hightlighting
      //TODO: for each pre code bloock..

      //need to return finalized array
      // return projectFileObjects;
    });


    console.log('post-processing2');
    // console.log(document.getElementsByClassName("code-block"));
    //get the 1 and only code-block, would need to loop also.. verified multiple are picke dup
    // let codeBlocks = document.getElementsByClassName("code-block");
    // console.log(codeBlocks.length);
    // let g: any = window;
    // g.eel = codeBlocks;

    console.log('highlight..');
    // Highlightjs.initHighlighting();
    // Highlightjs.highlightBlock(document.getElementsByClassName("code-block")[0]);
    // g.eel[0].childNodes.forEach(function(e){return console.log(e);}) this isnt working


    // console.log(codeBlocks[0].id);
    // let array = document.getElementsByClassName("code-block")[0].childNodes;
    // console.log(array.length);
    // console.log(array);


    // this.github.getData().subscribe(data => this.projectFiles = data.tree);
    // console.log(this.projectFiles);

  }

  // ngOnChanges(){
  //   console.log('ngOnChanges');
  // }
  //
  // ngAfterContentChecked(){
  //   console.log('ngAfterContentChecked');
  // }
  // ngAfterViewChecked(){
  //   console.log('ngAfterViewChecked');
  // }
  //
  // ngDoCheck(){
  //   console.log('ngDoCheck');
  // }

  @ViewChildren('allTheseThings') things: any;

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendered();
    })
  }

  ngForRendered() {
    console.log('NgFor is Rendered');
    Highlightjs.initHighlighting();


    //TODO: feature semantic highlighting...
    // this.applySemanticHighlighting();


    // console.log(g.eel[0].childNodes);
  }

  changeFontSize() {
    let code;
    code = document.querySelector('.code-block');
    code.style.fontSize = this.fontSize + 'px';
  }


  applySemanticHighlighting() {
    let codeBlocks = document.getElementsByClassName("code-block");
    console.log(codeBlocks.length);
    let g: any = window;
    g.eel = codeBlocks;
    g.tt = [];
    g.tk = {};

    // need to take out spans and see if wrapping text here works..
    let parentNode = g.eel[0];


    let keywordRegex = /[a-zA-Z\_][a-zA-Z0-9\_]*/g;

    g.eel[0].childNodes.forEach(function (e) {

      // if (e === 30){
      //   break;
      // }

      if (e.nodeName === "#text") {
        //do semantic stuff here
        g.tt.push(e);

        //TODO: extract semantic text
        //TODO: unique text cache with color
        //TODO span only part of text

        //TODO: DIL param scopes..

        //our cache build up..
        let str = e.data;
        let res = str.match(keywordRegex);
        console.log('KEYWROD EXTRACTIOn');
        if (res){
          res.forEach(key =>{
            g.tk[key] = key;
          })
        }
        console.log(res);


        var spanSemantic: any;
        spanSemantic = document.createElement("span");
        spanSemantic.style = 'color: red;';
        var spanSemanticText = document.createTextNode(e.data);
        spanSemantic.appendChild(spanSemanticText);
        //replaceChild(new, old)
        parentNode.replaceChild(spanSemantic, e);

        return e;
      } else {
        if (e.childNodes.length > 3) {
          // console.log('e with great length1!!!');
          // console.log(e);
          let parentNode2 = e;
          e.childNodes.forEach(function (e2) {
            // console.log('CHILD');
            // console.log(e2);
            // console.log(e2);
            if (e2.className === "hljs-params") {
              console.log('found PARAMs');
              // console.log(e2.data);
              console.log(e2);
              console.log(e2);
              g.tt.push(e2);

              var spanSemantic: any;
              spanSemantic = document.createElement("span");
              spanSemantic.style = 'color: blue;';
              var spanSemanticText = document.createTextNode(e2.textContent);
              spanSemantic.appendChild(spanSemanticText);
              parentNode2.replaceChild(spanSemantic, e2);

              return e2;
            }
          });
        }
      }


    });
  }

  // application/vnd.github.v3.raw
  handleProjectData(response: Response) {
    // console.log('handleProjectData');
    // console.log(response);
    let files;
    files = response;
    // this.profile = response;
    // console.log('this.profile');
    // console.log(this.profile);
    // this.projectFiles = this.profile.tree;
    // console.log('this.projectFiles');
    // console.log(this.projectFiles);
    this.projectFiles = files.tree;


    console.log(files.tree);
    return files.tree;


  }


}
//TODO: view instream

//TODO: cache the GET calls

//TODO: add github api
//TODO: fix formatting...
//TODO: fix formatting... specially for huge code blocks

//TODO: its not wrapping? need line breaks or something
//TODO: might need to lazy init with hljs.highlightBlock(block)
//TODO: webworkers

