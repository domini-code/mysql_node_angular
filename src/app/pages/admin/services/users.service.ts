import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@app/shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.API_URL}/users`)
      .pipe(catchError(this.handlerError));
  }

  getById(userId: number): Observable<User> {
    return this.http
      .get<any>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/users/`, user)
      .pipe(catchError(this.handlerError));  // The new user is created but, because it returns error? 
  }

  update(userId: number, user: User): Observable<User> {
    return this.http
      .patch<User>(`${environment.API_URL}/users/${userId}`, user)
      .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ::: ${error.message}`;
    }
    //////window.alert(errorMessage);   /// Devuelve un Error !
    return throwError(errorMessage);
  }
}
