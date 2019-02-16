import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/Dish';
import {DISHES} from '../shared/dishes';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
dishes :Dish[]=DISHES;
selecteddish:Dish;
  constructor() { }
onSelect(dish:Dish)
{
  this.selecteddish=dish;
}
  ngOnInit() {
  }
}
