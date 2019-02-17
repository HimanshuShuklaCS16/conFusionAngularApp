import { Injectable } from '@angular/core';
import {leaders} from '../shared/leaders';
import {Leader} from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  getLeaders():Leader[]{
    return leaders;
  }
  getLeader(id:string):Leader{
    return leaders.filter((leader) => (leader.id===id))[0];
  }
  getFeaturedLeader():Leader{
    return leaders.filter((leader) => leader.featured)[0];
  }
    constructor() { }
}
