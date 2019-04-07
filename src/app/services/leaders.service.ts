import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {Observable} from 'rxjs';
import {delay,map,catchError} from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPserviceService} from './process-httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

    constructor(private http:HttpClient,private processHTTPmsg:ProcessHTTPserviceService) { }

    getLeaders():Observable<Leader[]>{
      return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPmsg.handleError));
    }
    getLeader(id:string):Observable<Leader>{
      return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPmsg.handleError));
    }
    getFeaturedLeader():Observable<Leader>{
      return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map
        (leadership=>leadership[0]))
        .pipe(catchError(this.processHTTPmsg.handleError));
    }
    getLeaderIds():Observable<String[] | any>{
      return this.getLeaders().pipe(map(leadership=>leadership.map(leader=>leader.id)))
      .pipe(catchError(error=>error));
    }
    putDish(leader:Leader):Observable<Leader>{
      const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })
   };
      return this.http.put<Leader>(baseURL+'leadership/'+leader.id,leader,httpOptions)
      .pipe(catchError(this.processHTTPmsg.handleError));
    }}
