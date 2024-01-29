import { Component, Input, Output, EventEmitter  } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule }from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-ui-radio-button',
  standalone: true,
  imports: [MatRadioModule,NgFor,FormsModule],
  templateUrl: './ui-radio-button.component.html',
  styleUrl: './ui-radio-button.component.scss'
})
export class UiRadioButtonComponent {

  @Input() options: { value: any, label: string }[] = [];
  @Output() selectedValueChange = new EventEmitter<any>();
  selectedValue: any | null;

  constructor() {}

  onRadioChange() {
    this.selectedValueChange.emit(this.selectedValue);
  }
  
}
