import { Injectable } from '@angular/core';
import {leaders} from '../shared/leaders';
import {Leader} from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  getLeaders():Promise<Leader[]>{
    return Promise.resolve(leaders);
  }
  getLeader(id:string):Promise<Leader>{
    return Promise.resolve(leaders.filter((leader) => (leader.id===id))[0]);
  }
  getFeaturedLeader():Promise<Leader>{
    return Promise.resolve(leaders.filter((leader) => leader.featured)[0]);
  }
    constructor() { }
}
