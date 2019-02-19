import { Injectable } from '@angular/core';
import {leaders} from '../shared/leaders';
import {Leader} from '../shared/leader';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  getLeaders():Observable<Leader[]>{
    return of (leaders).pipe(delay(2000));

  }
  getLeader(id:string):Observable<Leader>{
    return of (leaders.filter((leader) => (leader.id===id))[0]).pipe(delay(2000));

}
  getFeaturedLeader():Observable<Leader>{
    return of (leaders.filter((leader) => leader.featured)[0]).pipe(delay(2000));

  }
    constructor() { }
}
