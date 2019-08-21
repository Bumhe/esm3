import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paymentcheck',
  templateUrl: './paymentcheck.component.html',
  styleUrls: ['./paymentcheck.component.css']
})
export class PaymentcheckComponent implements OnInit {

  public checkForm:FormGroup;
  private transRef:string="";
  constructor(private location:Location,private router:Router ) { }

  ngOnInit() {
    this.checkForm = new FormGroup({
      xytdd7788: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });
  }

  checkPayment(checkValue){

    this.transRef=checkValue.xytdd7788;
    this.router.navigate(['/member/payment/',this.transRef]);
    
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.checkForm.controls[controlName].hasError(errorName);
  }
}
