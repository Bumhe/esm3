import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  

  public initilize(body:any){
    return   this.http.post("https://api.paystack.co/transaction/initialize",body,this.generateHeaders());

  }

  public verify(reference:string){
    return   this.http.get("https://api.paystack.co/transaction/verify/"+reference,this.generateHeaders());
   
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders(
        
        {"authorization": "Bearer "+environment.apiKey,
        "content-type": "application/json",
        "cache-control": "no-cache"
      })
    }
  }
}
