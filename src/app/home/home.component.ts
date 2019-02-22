import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/Dish';
import {Leader} from '../shared/leader';
import {Promotion} from '../shared/promotion';
import {DishService} from '../services/dish.service';
import {PromotionService} from '../services/promotion.service';
import {LeadersService} from '../services/leaders.service';
import { flyInOut ,expand} from '../animations/app.animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
 '[@flyInOut]': 'true',
 'style': 'display: block;'
 },
 animations: [
   flyInOut(),expand()
 ]
})
export class HomeComponent implements OnInit {
dish:Dish;
promotion:Promotion;
leader:Leader;
homeerrmsg:string;
  constructor(private dishservice:DishService,
    private promotionservice:PromotionService,
    private leadersservice:LeadersService,
  @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish=dish,
    errmess=>this.homeerrmsg=<any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion);
    this.leadersservice.getFeaturedLeader().subscribe(leader=>this.leader=leader);
  }

}
