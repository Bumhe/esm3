import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  

  public initilize(body:any){
    return   this.http.post("https://api.paystack.co/transaction/initialize",body,this.generateHeaders());
    //sk_test_2f91d6664a8dec995ac06be3a7f9fcd961013d81
    //sk_live_7a7f5e511cb2bdf9b0edcfc4f06bd6fd096b7844
  }

  public verify(reference:string){
    return   this.http.get("https://api.paystack.co/transaction/verify/"+reference,this.generateHeaders());
   
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders(
        
        {"authorization": "Bearer sk_test_2f91d6664a8dec995ac06be3a7f9fcd961013d81",
        "content-type": "application/json",
        "cache-control": "no-cache"
      })
    }
  }
}
