

import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MemberForLogin } from '../../_interface/memberForLogin.model';
import {SuccessDialogComponent} from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { MatDialog } from '@angular/material';
import { Member } from 'src/app/_interface/member.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public loginForm: FormGroup;
  private dialogConfig;
  public member:Member;
  public showPayment:boolean=false;
  public showRegForm:boolean=false;
  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService) {
    
   }
 
  ngOnInit() {
    
    this.loginForm = new FormGroup({
      
      email: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      
      password: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    this.showRegForm=true;
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }

    
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public loginMember = (loginFormValue) => {
    if (this.loginForm.valid) {
      this.executeMemberLogin(loginFormValue);
    }
  }
 
  private executeMemberLogin = (loginFormValue) => {
    let member: MemberForLogin = {
      email: loginFormValue.email,
      password: loginFormValue.password,
      
    }
 
    let apiUrl = 'api/login';

this.repository.create(apiUrl, member)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
 
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      )
  }
 
}
