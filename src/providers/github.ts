import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import {Storage} from "@ionic/storage";
//TODO: storage service...

@Injectable()
export class GithubProvider {
  baseUrl = 'https://api.github.com/users';
  reposUrl = 'repos';
  testUrl = 'https://api.github.com/repos/ashikul/githubskimmer/git/trees/master?recursive=1';
  rawCodeHeaders = new Headers({
    'Accept': 'application/vnd.github.v3.raw',
    'Authorization': 'Basic YXNoaWt1bDpTaGlyemFkMDAx'
  });
  getDataHeaders = new Headers({Accept: 'application/json', Authorization: 'Basic YXNoaWt1bDpTaGlyemFkMDAx'});

  getDataOptions: RequestOptions = new RequestOptions({
    headers: this.getDataHeaders,
  });
  getRawCodeOptions: RequestOptions = new RequestOptions({
    headers: this.rawCodeHeaders,
  });


  constructor(public http: Http, public storage: Storage) {
    storage.set('name', 'Max');
  }

  getName() {
    return this.storage.get('name').then((val) => {
      return val;
    });
  }

  getData() {
    return this.http.get(this.testUrl, this.getDataOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRawCodeFromBlobUrl(url) {
    return this.http.get(url, this.getRawCodeOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRawCodeCached(url): Observable<any> {
    return this.storage.get(url).then((val) => {

      let cached = val;

      if (cached) {
        console.log('getting cached data');
        // console.log(cached);
        //NOTE: I REMOVED TO JSON
        return Observable.of(cached);
      } else {
        console.log('requesting new data');
        let request = new RequestOptions({
          headers: new Headers({
            Accept: 'application/vnd.github.v3.raw',
            Authorization: 'Basic YXNoaWt1bDpTaGlyemFkMDAx'
          }),
          url: url
        });

        return this.http.get(url, request)
          .map(resp => {
            // console.log('resp');
            // console.log(resp);
            // console.log('request');
            // console.log(resp);
            //NOTE: remove text
            let stringResponse = '';
            stringResponse = resp.text();
            // console.log('stringReponse');
            // console.log(stringResponse);
            // sessionStorage.setItem(url, stringResponse);
            this.storage.set(url, stringResponse);
            return stringResponse;
          })
      }
    });
  }

  getDataCached(url): Observable<any> {
    let cached = sessionStorage.getItem(url);

    if (cached) {
      console.log('getting cached data');
      return Observable.of(JSON.parse(cached));
    } else {
      console.log('requesting new data');
      let request = new RequestOptions({
        headers: new Headers({Accept: 'application/json', Authorization: 'Basic YXNoaWt1bDpTaGlyemFkMDAx'}),
        url: url //why do we need this as well???
      });

      return this.http.get(url, request)
        .map(resp => {
          sessionStorage.setItem(url, resp.text());
          return resp.json();
        });
    }
  }

  // mockGetUserInformation(username: string):Observable<User> {
  //   return Observable.of(USER_LIST.filter(user => user.name === username)[0])
  // }
  //
  //
  // mockGetRepositoryInformation(username: string): Observable<Repository[]> {
  //   return Observable.of(REPOSITORY_LIST.filter(repository => repository.owner.name === username));
  // }
  //
  // getUserInformation(username: string): Observable<User> {
  //   return this.http.get(`${this.baseUrl}/${username}`).map((data: Response) => data.json());
  // }
  //
  // getRepositoryInformation(username: string): Observable<Repository[]> {
  //   return this.http.get(`${this.baseUrl}/${username}/${this.reposUrl}`).map((data: Response) => data.json() as Repository[]);
  // }

  private extractData(res: Response) {
    let body = res.json();
    // console.log(res);
    // console.log(body);
    // return body.data || {}; NOTE: there is no data field...
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
