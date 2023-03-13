import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';
const USER_KEY ='User';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromlocalStorage()
  );
  public userObservable:Observable<User>
  constructor(private http: HttpClient, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: UserLogin) {
    return this.http
      .post<User>(`${environment.apiUrl}/users/login`, userLogin)
      .pipe(
        map((user) => {
          this.setUserToLocalStorage(user);
          this.router.navigateByUrl('/shop');
        })
      );
  }

  register(userRegister: UserRegister) {
    return this.http
      .post<User>(`${environment.apiUrl}/users/register`, userRegister)
      .pipe(
        map((user) => {
          this.setUserToLocalStorage(user);
          this.router.navigateByUrl('/shop');
        })
      );
  }
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromlocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
