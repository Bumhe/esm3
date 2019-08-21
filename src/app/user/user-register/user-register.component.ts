import { RepositoryService } from './../../shared/repository.service';
import { PaymentService } from './../../shared/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MemberForCreation } from '../../_interface/memberForCreation.model';
import {SuccessDialogComponent} from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { MatDialog } from '@angular/material';
import { Member } from '../../_interface/member.model';
import { PaymentInfo,PaymentInitialize } from '../../_interface/paymentUserInfo.model';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public memberForm: FormGroup;
 
  public member:Member;
  public selectOptions = [{name:'ESM', value: 'esm'},
  {name: `ESMAF`, value: 'esmaf'},
   {name: `Secondary Students`, value: 'secondary'}];
  public zonesOptions = [{name:'Abuja', value: 'abuja'},
    {name:'Aba', value: 'aba'},
    {name:'Bauchi', value: 'bauchi'},
    {name: 'Ilorin', value: 'ilorin'},
    {name:'Ibadan', value: 'ibadan'},
    {name:'Maiduguri', value: 'maiduguri'},
    {name:'Zaria', value: 'zaria'},
    {name:'Enugu', value: 'enugu'}];
  public genderOptions = [{name:'Male', value: 'male'},{name: `Female`, value: 'female'}];
 
  public showPayment:boolean=false;
  public showFeedback:boolean=false;
  public showRegForm:boolean=true;
  public feedback:string="";
  public reference:string="";
  constructor(private location: Location,private payment: PaymentService, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService) {
    
   }
 
  ngOnInit() {
    
    
    this.memberForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(25),Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      zone: new FormControl('', [Validators.required]),
      chapter: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
    this.showRegForm=true;
   
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.memberForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
    //alert(this.generateId());
  }

  public payWithPaystack = (payInfo:PaymentInitialize) => {
    
    this.payment.initilize(payInfo).subscribe(res=>{
     
      
      var url=res["data"]["authorization_url"];
      window.location.href=url;
    },
    err=>{
        alert("Error in this.payment");
    });
  }

  public onChange = ($event) => {
    //alert($event.value);
    //this.paymentInfo.amount=$event.value;
  }

  public onPay = () => {
    //Location.
  }
 
  public registerMember = (memberFormValue) => {
    if (this.memberForm.valid) {
      this.executeMemberCreation(memberFormValue);
    }
  }

  public generateId = () => {
     return Math.floor(Math.random()*899999 +100000)
  }
 
  private executeMemberCreation = (memberFormValue) => {
    let member: MemberForCreation = {
      firstName: memberFormValue.firstName,
      lastName: memberFormValue.lastName,
      email: memberFormValue.email,
      phone: memberFormValue.phone,
      gender: memberFormValue.gender,
      zone: memberFormValue.zone,
      category: memberFormValue.category,
      chapter:memberFormValue.chapter,
      amount:this.getAmount(memberFormValue.category),
      regId:this.generateId().toString()
    }
    
 
    let apiUrl = 'api/register';

this.repository.create(apiUrl, member)
      .subscribe(res => {
        
       
        this.reference=member.regId;
          this.feedback="Registration was successful. Your registration Id is "+member.regId;
          this.showRegForm=false;
          this.showFeedback=true;
      },
        err => {
         
          alert(err.message);
          console.log(err);
          
        }
      )
  }
 
  private getAmount=(category:string):number=>{

    if(category=='esm'){
      return 1000;
    }
    if(category=='esmaf'){
      return 3000;
    }
    if(category=='student'){
      return 500;
    }
  }
}