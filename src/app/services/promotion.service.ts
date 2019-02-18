import { Injectable } from '@angular/core';
import {PROMOTIONS} from '../shared/promotions';
import {Promotion} from '../shared/Promotion';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions():Promise<Promotion[]>{
    return  Promise.resolve(PROMOTIONS);
  }
  getPromotion(id:string):Promise<Promotion>{

    return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.id===id))[0]);
  }
  getFeaturedPromotion():Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  constructor() { }
}
