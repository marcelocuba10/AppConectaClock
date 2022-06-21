import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Ground } from '../models/ground';
import { Schedule } from '../models/schedule';
import { Report } from '../models/report';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //API_URL = 'https://jahuga.badrobotspy.com/api/';
  API_URL = 'http://127.0.0.1:8000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  constructor(private http: HttpClient) { }

  /*** Handle API errors ***/
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  /*** reports ***/
  public getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.API_URL + 'reports', this.httpHeader);
  }

  public getReportsByUser(id: number): Observable<Report> {
    return this.http.get<Report>(this.API_URL + 'report/user/' + id, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public verifyReport(id: number): Observable<Report> {
    return this.http.get<Report>(this.API_URL + 'report/user/check/' + id, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public addReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.API_URL + 'report/', report, this.httpHeader);
  }

  public updateReport(reportId: number, report: Report): Observable<Report> {
    return this.http.put<Report>(this.API_URL + 'report/' + reportId, report, this.httpHeader);
  }

  public deleteReport(reportId: number): Observable<Report> {
    return this.http.delete<Report>(this.API_URL + 'report/' + reportId, this.httpHeader);
  }

  /*** get Schedules ***/
  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + 'schedules', this.httpHeader);
  }


  /*** get User ***/
  public getUsers(): Observable<User> {
    return this.http.get<User>(this.API_URL + 'users/', this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getUserById(id): Observable<User> {
    return this.http.get<User>(this.API_URL + 'users/' + id, this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}