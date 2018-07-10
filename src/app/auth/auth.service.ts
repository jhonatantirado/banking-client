import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { Customer} from '../models/customer';
import { Globals} from '../shared/globals';
import { Observable} from 'rxjs/Observable';
import { HttpOptionsConst} from '../shared/http-options';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageAlertHandleService} from '../services/message-alert.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ResponseApi } from '../models/dto/responseApi';


@Injectable()
export class AuthService {
  API_URL : string = environment.apiUrl + 'login';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private globals: Globals,
    public _messageAlertHandleService: MessageAlertHandleService,
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {      

       this.authentication(user.userName, user.password).subscribe(
              successData => {
                this.globals.customer = successData.response.content;
                //this._messageAlertHandleService.handleSuccess(successData.response.message); //rfv
              },
              error => {
                this._messageAlertHandleService.handleError(error);                
              },
              () => {
                this.loggedIn.next(true);
                this.router.navigate(['/dashboard']); 
              }
        );
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  authentication(username : string, password : string ): Observable<ResponseApi> {
    return this.httpClient
              .post(this.API_URL, {user: username, password: password},  HttpOptionsConst)
              .map(
                res => res
              )
              .catch((error: any) => Observable.throw(error));
  }
}
