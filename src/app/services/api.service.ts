import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../models/report';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'https://conectaclock.badrobotspy.com/api/';
  //API_URL = 'http://127.0.0.1:8000/api/';

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
    return this.http.post<Report>(this.API_URL + 'report', report, this.httpHeader);
  }

  public updateReport(reportId: number, report: Report): Observable<Report> {
    return this.http.put<Report>(this.API_URL + 'report/' + reportId, report, this.httpHeader);
  }

  public deleteReport(reportId: number): Observable<Report> {
    return this.http.delete<Report>(this.API_URL + 'report/' + reportId, this.httpHeader);
  }

  /*** get notifications ***/
  public getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.API_URL + 'notifications', this.httpHeader);
  }

  /*** scan qrcode machines ***/

  public getMachineByQRcode(qrcode: string): Observable<Machine> {
    return this.http.get<Machine>(this.API_URL + 'machine/' + qrcode, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public updateMachine(qrcode: string, machine: Machine): Observable<Machine> {
    console.log( machine);
    return this.http.put<Machine>(this.API_URL + 'machine/' + qrcode, machine, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

}