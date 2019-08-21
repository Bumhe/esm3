import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './../../../shared/payment.service';
import { RepositoryService } from './../../../shared/repository.service';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public message:string='';
  private refrence:string="";
  constructor(private route: ActivatedRoute,private payment: PaymentService,private repo: RepositoryService){}
    
  

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.refrence=params["reference"];
      //alert(this.refrence);
      this.verifyPayment(this.refrence);
    });
  }

  public  verifyPayment(refrenceCode:string){
    
      this.payment.verify(refrenceCode).subscribe(
        
        res=>{
          
          if(res['data']['status']=='success'){
              this.message="Thank you";
              var body={reference:refrenceCode}
              this.repo.update("api/pay",body).subscribe(res=>{
                 if(res['success']==true){
                   this.message + "And records updated succesfully";
                 }
              });
          }
          else{
            this.message="Payment was not successful. please try again later by clicking on the 'Check Payment' Link on the home page.";
          }
        },
        err=>{
            this.message="A server error occured . please try again later by clicking on the 'Check Payment' Link on the home page.";
        });
        
  }

}
