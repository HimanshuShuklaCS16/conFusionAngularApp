import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,delay,catchError} from 'rxjs/operators';
import {ProcessHTTPserviceService} from './process-httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
  private processHTTPmsg:ProcessHTTPserviceService) { }
  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPmsg.handleError));
  }
  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPmsg.handleError));
  }
  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map
      (promotions=>promotions[0]))
      .pipe(catchError(this.processHTTPmsg.handleError));
  }
}
