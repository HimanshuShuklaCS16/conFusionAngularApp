import { Injectable } from '@angular/core';
import {leaders} from '../shared/leaders';
import {Leader} from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  getLeaders():Promise<Leader[]>{
    return new Promise (resolve=>{
      setTimeout(()=>resolve(leaders),2000);
    });
  }
  getLeader(id:string):Promise<Leader>{
    return new Promise (resolve=>{
      setTimeout(()=>resolve(leaders.filter((leader) => (leader.id===id))[0]),2000);
  });
}
  getFeaturedLeader():Promise<Leader>{
    return new Promise (resolve=>{
      setTimeout(()=>resolve(leaders.filter((leader) => leader.featured)[0]),2000);
    });
  }
    constructor() { }
}
