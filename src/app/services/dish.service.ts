import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPserviceService} from './process-httpservice.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

    constructor(private http:HttpClient,
    private processHTTPmsg:ProcessHTTPserviceService) { }
    getDishes():Observable<Dish[]>{
      return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPmsg.handleError));
    }
    getDish(id:string):Observable<Dish>{

      return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPmsg.handleError));

    }
    getFeaturedDish():Observable<Dish>{
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map
        (dishes=>dishes[0]))
        .pipe(catchError(this.processHTTPmsg.handleError));

    }
    getDishIds():Observable<String[] | any>{
      return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
      .pipe(catchError(error=>error));
    }
    putDish(dish:Dish):Observable<Dish>{
      const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })
   };
      return this.http.put<Dish>(baseURL+'dishes/'+dish.id,dish,httpOptions)
      .pipe(catchError(this.processHTTPmsg.handleError));
    }
}
