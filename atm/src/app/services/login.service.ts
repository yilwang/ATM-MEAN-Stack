import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private serverURL: string = '/api/getUser';
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private httpSubscription: Subscription;
  private apiResult: LoginModel;

  constructor(private http: HttpClient) { }

  public resetData(): void{
    this.apiResult = null;
    this.updateLoading(false);
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable(); 
  }

  private updateLoading(loading_value: boolean ): void {
    this.loading.next(loading_value); 
  }

  public getApiResult():LoginModel {
    return this.apiResult;
  }

  public caller(first_name: string, last_name: string) {
    if(!this.loading.getValue() && first_name && last_name) {
      this.updateLoading(true);
      this.httpSubscription = this.http.get(`http://localhost:8080${this.serverURL}/${first_name}/${last_name}`).subscribe((response: any) => {
        console.log('This is the response: ', response);
        this.apiResult = new LoginModel(response);
        this.updateLoading(false);
      }, (error: any) => {
        this.apiResult = new LoginModel(error);
        this.updateLoading(false);
      });
    }
  }
}

export class LoginModel {
  readonly status: string;
  readonly customer: Customer;
  readonly error: Object;
  readonly account: Account;
  constructor(response) {
    if(response && response.status === 'success') {
      this.status = response.status;
      this.customer = response.customer;
      this.account = response.customer.account;
    } else if(response) {
      this.status = response.status;
      this.error = response.error;
    } else {
      this.status = 'failure';
    }
  }
}

export interface Customer {
  first_name: string;
  last_name: string;
  pin: string;
}

export interface Account {
  account_num: string;
  amount: number;
}


