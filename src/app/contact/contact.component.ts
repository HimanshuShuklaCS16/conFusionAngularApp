import { Component, OnInit ,ViewChild} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import {flyInOut,expand} from '../animations/app.animations';
import {FeedbackService} from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
 '[@flyInOut]': 'true',
 'style': 'display: block;'
 },
 animations: [
   flyInOut(),expand()
 ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
feedbackForm:FormGroup;
feedback:Feedback;
feedbackcopy:Feedback;
displayform:boolean=true;
submitform:boolean;
contactType=ContactType;
errMess: string;
  constructor(private fb:FormBuilder,private feedbackservice:FeedbackService) {
  this.createForm();
 }
 formErrors={
   'firstname':'',
   'lastname':'',
   'telnum':'',
   'email':''
 };
 validationmessages={
   'firstname':{
     'required':'First name is required',
     'minlength':'First name should be at least 2 characters long',
     'maxlength':'first name cannot be more than 25 characters long'
   },
   'lastname':{
     'required':'Last name is required',
     'minlength':'Last name should be at least 2 characters long',
     'maxlength':'Last name cannot be more than 25 characters long'
   },
   'telnum':{
     'required':'telnum  is required',
     'pattern':'telnum is not valid'
   },
   'email':{
     'required':'email  is required',
     'email':'Email is not in valid format'
   },
 };
createForm():void{
  this.feedbackForm=this.fb.group({
    firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    telnum:['',[Validators.required,Validators.pattern]],
    email:['',[Validators.required,Validators.email]],
    agree:false,
    contacttype:"none",
    message:""
  });
  this.feedbackForm.valueChanges
  .subscribe(data=>this.onValueChanged(data));
  this.onValueChanged();
}
onValueChanged(data?: any) {
   if (!this.feedbackForm) { return; }
   const form = this.feedbackForm;
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

  ngOnInit() {
  }
onSubmit(){
  this.feedback=this.feedbackForm.value;
  this.submitform=true;
  this.displayform=false
  this.feedbackservice.submitFeedback(this.feedback)
  .subscribe(feedback=>{
    this.submitform=false;
      this.feedback=feedback;
      setTimeout(()=>{
        this.feedback=null;
        this.displayform=true;
      },5000)
    },
    errmess => { this.feedback = null; this.errMess = <any>errmess; });
  this.feedbackForm.reset({
    firstname:'',
    lastname:'',
    telnum:0,
    email:'',
    agree:false,
    contacttype:'none',
    message:''
  });
  this.feedbackFormDirective.resetForm();
}
}
