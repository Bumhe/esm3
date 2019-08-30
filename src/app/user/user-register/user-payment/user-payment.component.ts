import { PaymentInitialize } from './../../../_interface/paymentUserInfo.model';
import { Payment } from './../../../_interface/payment.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from './../../../shared/payment.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MemberForCreation } from '../../../_interface/memberForCreation.model';
import {SuccessDialogComponent} from '../../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { PaymentInfo } from '../../../_interface/paymentUserInfo.model';
import { RepositoryService } from 'src/app/shared/repository.service';


@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  public member: MemberForCreation={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    regId:'',
    zone:"",
    chapter:'',
    category:'',
    gender:''
  };
  @Input() public paymentInfo: PaymentInfo;
  @Output() paymentEmitt = new EventEmitter();
  public paymentForm: FormGroup;
  private regId:string="";
  public memberExists:boolean=false;
  public memberExistsMsg:boolean=false;
  private paymentInitial:PaymentInitialize={
    amount:0,
    email:"",
    reference:""
  };
  
  constructor(private location: Location, private payment: PaymentService,private repository:RepositoryService,private route: ActivatedRoute,private router:Router) {
    
   }
 
   ngOnInit() {
    this.route.params.subscribe(params => {
     
      this.regId = params['registrationId'];
      
        this.repository.getData("api/userByRegId/"+this.regId).subscribe(memb=>
          
          {
            //alert(memb["firstName"]);
              this.memberExists=true;
           
            this.member.firstName=memb["firstName"];
            this.member.lastName=memb["lastName"];
            this.member.email=memb["email"];
            this.member.zone=memb["zone"];
            this.member.chapter=memb["chapter"];
            this.member.category=memb["category"];
            this.member.amount=memb["amount"];
            this.member.regId=memb["regId"];
            this.member.paid=Boolean(memb["paid"]);
          },
          err=>{
            this.memberExists=false;
            this.memberExistsMsg=true;
          }
          
          );
         
    })

  }
  public onInvalid = () => {

    //this.router.navigateByUrl[("/member/check-payment")];
  }
  public onPay = () => {
    //this.paymentEmitt.emit(event.value);
    this.paymentInitial.email=this.member.email;
    this.paymentInitial.amount=this.getAmount(this.member.category)*100;
    this.paymentInitial.callback_url="https://c544d29c.ngrok.io/member/confirm";
    this.paymentInitial.reference=this.member.regId;
    this.payment.initilize(this.paymentInitial).subscribe(res=>{
     
      
      var url=res["data"]["authorization_url"];
      window.location.href=url;
    },
    err=>{
        alert("Error in this.payment");
    });
  }

  private getAmount=(category:string):number=>{

    if(category=='esm'||category=='1000'){
      return 1000;
    }
    if(category=='esmaf'||category=='3000'){
      return 3000;
    }
    if(category=='student'||category=='500'){
      return 500;
    }
  }
}
