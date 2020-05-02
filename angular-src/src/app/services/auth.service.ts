import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http:Http) { }

  loggedIn()
  {
    return tokenNotExpired();
  }

  registerUser(user)
  {
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
        .pipe(map(res=>res.json()));
  }

  authenticateUser(user)
  {
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
        .pipe(map(res=>res.json()));
  }
  storeUserData(token,user)
  {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization",this.authToken);
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
        .pipe(map(res=>res.json()));
  }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logOut()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
