import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NativeDateAdapter} from '@angular/material/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-ui-datepicker',
  standalone: true,
  providers: [],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './ui-datepicker.component.html',
  styleUrl: './ui-datepicker.component.scss'
})
export class UiDatepickerComponent {

  @Input() label: string = 'Choose a date';
  @Output() selectedDateChange = new EventEmitter<Date>();
  selectedDateControl = new FormControl();

  constructor() {}

  onDateChange() {
    this.selectedDateChange.emit(this.selectedDateControl.value);
  }

}
