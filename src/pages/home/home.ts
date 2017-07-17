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
    projectFiles;
    name = '';

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
        Highlightjs.initHighlightingOnLoad();
        // console.log(this.projectTreeURL);
        // console.log(this.blobURL);


        this.name = this.github.getName();
        // this.github.getData().subscribe(response => (this.profile = response));
        // this.projectFiles = this.github.getData().subscribe(this.handleProjectData);


        //we'll save this in the future
        this.projectFiles = this.github.getDataCached('https://api.github.com/repos/creationix/js-github/git/trees/master?recursive=1').map(data => {

            //path
            //type
            let projectFileObjects = [];
            //
            data.tree.forEach(file => {

                    let rawCodeString;


                    //TODO: what about no nblobs??
                    if (file.type === "blob") {
                        this.github.getRawCodeCached(file.url).subscribe(codeString => {
                            rawCodeString = codeString;


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
            return projectFileObjects;
            //need to return finalized array
            // return projectFileObjects;
        }); //woot this works


        //TODO: not done yet need to get rawCode and fileType

        // this.github.getData().subscribe(data => this.projectFiles = data.tree);
        console.log(this.projectFiles);

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
