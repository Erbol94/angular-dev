import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // Здесь исправлено
// import 'moment/locale/ru';

@Component({
  selector: 'app-ui-datepicker',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './ui-datepicker.component.html',
  styleUrl: './ui-datepicker.component.scss'
})
export class UiDatepickerComponent {

  @Input() label: string = 'Выберите дату'; // Изменено на русский текст
  @Output() selectedDateChange = new EventEmitter<Date>();
  selectedDateControl = new FormControl();

  constructor(private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string,) {
    this._adapter.setLocale('ru');
  }

  onDateChange() {
    this.selectedDateChange.emit(this.selectedDateControl.value);

  }

}
