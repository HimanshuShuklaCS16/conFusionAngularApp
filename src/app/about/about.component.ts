import { Component, OnInit } from '@angular/core';
import {LeadersService} from '../services/leaders.service';
import {Leader} from '../shared/leader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
leaders:Leader[];
  constructor(private leadersservice:LeadersService) { }

  ngOnInit() {
this.leadersservice.getLeaders()
.subscribe(leaders=>this.leaders=leaders);
  }

}
