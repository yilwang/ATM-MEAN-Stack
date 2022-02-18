import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService, LoginModel } from 'src/app/services/login.service';
import { ModalComponent, ModalParam } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  public loginResult: LoginModel; 

  constructor(private loginService: LoginService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void { //this is a lifecycle hook. 
    this.loginResult = this.loginService.getApiResult();
  }
  private openModal(params: ModalParam): void{
    const modal = this.modalService.open(ModalComponent, { windowClass: 'dark-modal', centered: true, size: 'lg' });
    modal.componentInstance.title = params ? params.title : '';
    modal.componentInstance.message = params ? params.message : '';
    modal.componentInstance.button1 = params ? params.button1 : '';
    modal.componentInstance.button2 = params ? params.button2 : '';
    modal.componentInstance.parentFunction1 = params ? params.parentFunction1 : undefined;
    modal.componentInstance.parentFunction2 = params ? params.parentFunction2 : undefined;
    modal.componentInstance.showKeyboard = params ? params.showKeyboard : false;
    console.log('show keyboard Submit: ', params.showKeyboardSubmit);
    modal.componentInstance.showKeyboardSubmit = params && typeof params.showKeyboardSubmit === 'boolean' ? params.showKeyboardSubmit : true;
    modal.componentInstance.keyboardMaxLength = params ? params.keyboardMaxLength : 0;
    modal.componentInstance.keyboardSecretDisplay = params && typeof params.keyboardSecretDisplay === 'boolean' ? params.keyboardSecretDisplay : true;
  }

  public withdrawAmount(stringAmount: string): void{
    const amount: number = parseInt(stringAmount);
    if(this.loginResult && this.loginResult.account && (this.loginResult.account.amount > amount)){
      this.loginResult.account.amount -= amount;
      const params: ModalParam = {
        title: 'Success',
        message: `You withdrew $${amount}`,
        button1: 'Dismiss'
      }; 
      this.openModal(params);
    }else{
      const params: ModalParam = {
        title: 'Alert',
        message: `You don't have enough funds.`,
        button1: 'Dismiss'
      }; 
      this.openModal(params);
    }
  }

  public withdraw(): void {
    const params: ModalParam ={
      title:'Withdrawal Amount',
      showKeyboard: true,
      showKeyboardSubmit: false,
      button1:'Submit',
      button2:'Cancel',
      keyboardMaxLength: 4, 
      keyboardSecretDisplay: false,
      parentFunction1: this.withdrawAmount.bind(this)
    }
    this.openModal(params);
  }

  public deposit(): void {
    const params: ModalParam ={
      title:'Deposit Amount',
      showKeyboard: true,
      showKeyboardSubmit: false,
      button1:'Submit',
      button2:'Cancel',
      keyboardMaxLength: 4,
      keyboardSecretDisplay: false,
      parentFunction1: this.depositAmount.bind(this)
    }
    this.openModal(params);
  }

  public depositAmount(stringAmount: string): void {
    const amount: number = parseInt(stringAmount);
    if(this.loginResult && this.loginResult.account){
      this.loginResult.account.amount += amount;
      const params: ModalParam = {
        title: 'Success',
        message: `You deposited $${amount}`,
        button1: 'Dismiss'
      }; 
      this.openModal(params);
    }
  }

  public viewAccountBalance(): void {
    if(this.loginResult && this.loginResult.account){
      const params: ModalParam = {
        title: 'Account Balance',
        message: `You have balance of $${this.loginResult.account.amount}`,
        button1: 'Dismiss'
      }; 
      this.openModal(params);
    }else{
      const params: ModalParam = {
        title: 'Alert',
        message: `We could not access your account balance.`,
        button1: 'Dismiss'
      }; 
      this.openModal(params);
    }
  }

  public finish(): void {
    this.loginService.resetData();
    this.router.navigate(['/']);
  }

}
