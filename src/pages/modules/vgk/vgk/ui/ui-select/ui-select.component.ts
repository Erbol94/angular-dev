import { Component, Output, EventEmitter  } from '@angular/core';
import { Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-select',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss'
})
export class UiSelectComponent {

  @Input() options: { value: any, label: string }[] = [];
  @Output() selectedValueChange = new EventEmitter<any>();
  selectedValue: any;

  constructor() {
  
  }

  
  onSelectChange() {
    this.selectedValueChange.emit(this.selectedValue);
  }

}
