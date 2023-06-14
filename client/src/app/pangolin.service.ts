import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IFriend } from 'src/data/IFriend';

import { IPangolin } from 'src/data/IPangolin';

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  currentUser: IPangolin | undefined;

  constructor(private http: HttpClient) {}

  // Post
  Login = (
    username: string,
    password: string
  ): Observable<IPangolin | undefined> => {
    return this.http
      .post<IPangolin>('http://localhost:3001/api/auth/login', {
        username,
        password,
      })
      .pipe(
        map((data) => {
          if (data) {
            localStorage.setItem('pangolin', JSON.stringify(data));
            return data;
          }
          return undefined;
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };
  Register = (
    username: string,
    password: string
  ): Observable<IPangolin | undefined> => {
    return this.http
      .post<IPangolin>('http://localhost:3001/api/auth/register', {
        username: username,
        password: password,
      })
      .pipe(
        map((data) => {
          if (data) {
            localStorage.setItem('pangolin', JSON.stringify(data));
            return data;
          }
          return undefined;
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };
  AddFriend = (
    username: string,
    friend_username: string
  ): Observable<IFriend | undefined> => {
    return this.http
      .post<IFriend>('http://localhost:3001/api/friends/add', {
        username: username,
        friend_username: friend_username,
      })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          }
          return undefined;
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };

  // Update
  UpdatePangolin = (
    id: string,
    username: string,
    new_password: string,
    role: string
  ): Observable<IPangolin | undefined> => {
    return this.http
      .put<IPangolin>('http://localhost:3001/api/auth/update', {
        username: username,
        id: id,
        password: new_password,
        role: role,
      })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          }
          return undefined;
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };

  //Delete
  RemoveFriend = (
    id: string | undefined
  ): Observable<string | undefined> => {
    return this.http
      .delete<string>(`http://localhost:3001/api/friends/remove/${id}`)
      .pipe(
        map((data) => {
          if (data) {
            return data;
          }
          return undefined;
        }),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };

  // Get
  SearchPangolin = (
    username: string,
    friend_username: string
  ): Observable<IPangolin[] | undefined> => {
    return this.http
      .post<IPangolin[]>('http://localhost:3001/api/pangolin/search', {
        username: username,
        friend_username: friend_username,
      })
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };
  AllFriend = (username: string): Observable<IFriend[] | undefined> => {
    return this.http
      .get<IFriend[]>(`http://localhost:3001/api/friends/all/${username}`)
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };
  OneFriend = (
    friend_username: string | null
  ): Observable<IPangolin | undefined> => {
    return this.http
      .get<IPangolin>(
        `http://localhost:3001/api/pangolin/one/${friend_username}`
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  };
}
