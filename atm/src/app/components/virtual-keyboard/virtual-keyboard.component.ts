import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent implements OnInit {

  @Input() message: string;
  @Input() max: number = 0;
  @Input() min: number = 0;
  @Input() secretDisplay: boolean = true;
  @Input() showKeyboardSubmit: boolean = true;
  @Input() error: string = '';
  @Output() errorChange = new EventEmitter<string>();
  @Output() submission = new EventEmitter<string>();
  @Output() amount = new EventEmitter<string>();


  public display: string[] = new Array(this.max);
  public userInput: string = '';

  constructor() { }

  ngOnInit(): void {
    this.display = new Array(this.max);
  }

  public onKeyClick(value: string): void {
    if (this.userInput.length < this.max) {
      this.userInput = this.userInput + value;
      this.changeErrorMessage('');
      this.populateDisplay();
    } else {
      this.changeErrorMessage(`You cannot exceed ${this.max} digits.`);
    }
  }

  public onBackspaceClick(): void {
    this.userInput = this.userInput.substring(0, this.userInput.length - 1);
    this.changeErrorMessage('');
    this.populateDisplay();
  }

  /**
   * @description - It clears everything in the display.
   **/
  public onClearClick(): void {
    this.userInput = '';
    this.changeErrorMessage('');
    this.populateDisplay();
  }

  public onSubmitClick(): void {
    if (this.userInput && this.userInput.length >= this.min) {
      this.submission.emit(this.userInput);
    } else {
      this.changeErrorMessage('Your input is too short.');
    }
  }

  private populateDisplay(): void{
    for(let i = 0; i < this.display.length; i++){
      if(this.secretDisplay && this.userInput[i]){
        this.display[i] = '*';
      }else if(this.userInput[i]){
      this.display[i] = this.userInput[i];
      }else{
        this.display[i] = '';
      }
    }
    this.amount.emit(this.userInput);
  }
  private changeErrorMessage(message: string): void{
    this.error = message;
    this.errorChange.emit(this.error);
  }
}
