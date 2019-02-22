import { Component, OnInit ,Input,ViewChild,Inject} from '@angular/core';
import {Dish} from '../shared/Dish';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import {switchMap } from 'rxjs/operators';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Comment} from '../shared/comment';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
@ViewChild("newform") commentFormDirective;
commentForm:FormGroup;
comment:Comment;
dish:Dish;
dishIds:string[];
prev:string;
next:string;
dishCopy:Dish;
  constructor(private dishservice:DishService,
    @Inject('BaseURL')private baseURL,
    private route:ActivatedRoute,
private location:Location,
private fb:FormBuilder) {
this.createForm();
 }
 formErrors={
   'author':'',
   'comment':'',
   'rating':''
 };

 validationmessages={
   'author':{
     'required':'First name is required',
     'minlength':'First name should be at least 2 characters long'
   },
   'comment':{
     'required':'Comment is required'
   }
 };
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds=> this.dishIds=dishIds);
       const id = this.route.params.pipe(switchMap((params:Params)=> this.dishservice.getDish(params['id'])))
       .subscribe(dish=>{this.dish=dish;this.dishCopy=dish;this.setPrevNext(dish.id);});
  }
  setPrevNext(dishId:string){
  const index=this.dishIds.indexOf(dishId);
  this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
  this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }
  createForm():void{
    this.commentForm=this.fb.group({
      comment:['',[Validators.required]],
      author:['',[Validators.required,Validators.minLength(2)]],
      rating:[5]
    });
    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
     if (!this.commentForm) { return; }
     const form = this.commentForm;
     for (const field in this.formErrors) {
       if (this.formErrors.hasOwnProperty(field)) {
         // clear previous error message (if any)
         this.formErrors[field] = '';
         const control = form.get(field);
         if (control && control.dirty && !control.valid) {
           const messages = this.validationmessages[field];
           for (const key in control.errors) {
             if (control.errors.hasOwnProperty(key)) {
               this.formErrors[field] += messages[key] + ' ';
             }
           }
         }
       }
     }
   }
goBack():void{
  this.location.back();
}
onSubmit(){
  this.comment=this.commentForm.value;
  var d = new Date();
var n = d.toISOString();
  this.comment.date=n;
  this.dishCopy.comments.push(this.comment);
  this.dishservice.putDish(this.dishCopy)
  .subscribe(dish=>{
    this.dish=dish;
    this.dishCopy=dish;
  });
  //this.dish.comments.push(this.comment);

  this.commentForm.reset({
    author:'',
    comment:'',
    rating:5
  });
}
}
