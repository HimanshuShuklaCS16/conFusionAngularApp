import { Injectable } from '@angular/core';
import {Feedback,ContactType} from '../shared/feedback';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {Observable} from 'rxjs';
import {map,delay,catchError} from 'rxjs/operators';
import {ProcessHTTPserviceService} from './process-httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
  private processHTTPmsg:ProcessHTTPserviceService) { }
  submitFeedback(feedback:Feedback):Observable<Feedback>{
    const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json'
   })
 };
    return this.http.post<Feedback>(baseURL+'feedback/',feedback,httpOptions)
    .pipe(catchError(this.processHTTPmsg.handleError));
  }
}
