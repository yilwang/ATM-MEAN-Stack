import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() button1: string = 'Dismiss';
  @Input() button2: string;
  @Input() parentFunction1: Function;
  @Input() parentFunction2: Function;
  @Input() showKeyboard: boolean;
  @Input() showKeyboardSubmit: boolean;
  @Input() keyboardMaxLength: number;
  @Input() keyboardSecretDisplay: boolean = true;
  
  public amount: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public callParentFunction1(event: Event): void {
    this.modal.close();
    if(this.parentFunction1 && this.amount){
      this.parentFunction1(this.amount);
    }else if (this.parentFunction1) {
      this.parentFunction1(event);
    }
  }

  public callParentFunction2(event: Event): void {
    this.modal.close();
    if (this.parentFunction2) {
      this.parentFunction2(event);
    }
  }
  
  public onKeyboardClick(input: string): void{
    this.amount = input;
  } 
}

export interface ModalParam {
  title?: string;
  message?: string;
  button1?: string;
  button2?: string;
  parentFunction1?: Function;
  parentFunction2?: Function;
  showKeyboard?: boolean;
  showKeyboardSubmit?: boolean;
  keyboardMaxLength?: number;
  keyboardSecretDisplay?: boolean;
}
