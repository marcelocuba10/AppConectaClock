import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Machine } from '../models/machine';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'https://conectaclock.badrobotspy.com/api/';
  //API_URL = 'http://127.0.0.1:8000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json, application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
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

  constructor(
    private http: HttpClient
    ) {}

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


  /*** schedules ***/
  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + 'schedules', this.httpHeader);
  }

  public getSchedulesByUser(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.API_URL + 'schedule/user/' + id, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public checkSchedule(id: number): Observable<Schedule> {
    console.log(this.API_URL + 'schedule/user/check/' + id);
    return this.http.get<Schedule>(this.API_URL + 'schedule/user/check/' + id, this.httpHeader)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.API_URL + 'schedule', schedule, this.httpHeader);
  }

  public updateSchedule(scheduleId: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.API_URL + 'schedule/' + scheduleId, schedule, this.httpHeader);
  }

  public deleteSchedule(scheduleId: number): Observable<Schedule> {
    return this.http.delete<Schedule>(this.API_URL + 'schedule/' + scheduleId, this.httpHeader);
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