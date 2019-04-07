import { Component, OnInit,Inject } from '@angular/core';
import {LeadersService} from '../services/leaders.service';
import {Leader} from '../shared/leader';
import {flyInOut,expand} from '../animations/app.animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
 '[@flyInOut]': 'true',
 'style': 'display: block;'
 },
 animations: [
   flyInOut(),expand()
 ]
})
export class AboutComponent implements OnInit {
leaders:Leader[];
  constructor(private leadersservice:LeadersService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
this.leadersservice.getLeaders()
.subscribe(leaders=>this.leaders=leaders);
console.log(this.leaders)
  }

}
