import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginModel, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private loginServiceResult: LoginModel;
  public errorMessage: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void { // this is a framework function. This does not need to specified the accessor modifier.
    this.callLoginService('Samuel', 'Oak');
    this.subscribeLoginService();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  public onSubmitClick(pin: string): void {
    if (this.loginServiceResult && this.loginServiceResult.status === 'success' && pin == this.loginServiceResult.customer.pin) {
      this.router.navigate(['/account']);
    } else {
      this.errorMessage = 'We couldn\'t verify your input pin.\nPlease enter your 4-digit pin again.';
    }
  }
  private callLoginService(first_name: string, last_name: string): void {
    if (first_name && last_name) {
      this.loginService.caller(first_name, last_name);
    }
  }
  private subscribeLoginService(): void {
    this.loginService.getLoading().pipe(takeUntil(this.ngUnsubscribe)).subscribe((loading: boolean) => {
      if (!loading) {
        this.loginServiceResult = this.loginService.getApiResult();
      }
    })
  }
}



