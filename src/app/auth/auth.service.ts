import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, from, delayWhen } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { AuthRequest } from '../models/auth-request';
import { Storage } from '@ionic/storage';

import { environment } from 'src/environments/environment';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  removeGroupFromUser$(groupId: string): Observable<User> {
    return this.#auth$.pipe(
      map((auth) => {
        auth.user.groups.splice(auth?.user.groups.indexOf(groupId), 1);
        this.storage.set('auth', auth)
        return auth?.user;
      })
    );
  }
  addUserToGroup$(groupId: string): Observable<User> {
    return this.#auth$.pipe(
      map((auth) => {
        auth.user.groups.push(groupId)
        this.storage.set('auth', auth);
        return auth?.user;
      })
    );
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}/auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(null);
    this.storage.remove('auth');
  }
}
