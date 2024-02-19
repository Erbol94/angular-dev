import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vgk-add',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './vgk-add.component.html',
  styleUrl: './vgk-add.component.scss'
})
export class VgkAddComponent {

  vgkForm!: FormGroup;
  data: any;
  originalData: any;


  ngOnInit(): void {
    this.vgkForm = this.fb.group({
      transportNumber: [''],
      trailerNumber: [''],
      creatingDate: [''],
      recordingMethod: [''],
      totalWeight: [''],
      violation: [''],
      weighingType: [''],
      status: [''],
      euro: [''],
      modifierType: [''],
      axles: [''],
      photos: [''],
      dimensions: [''],
      // overload: [],
      transitViolations: [],
      addInfo: [''],
      prevVerID: [''],
      actNumber: [''],
      category: [''],
      vehicleTstk: ['']
    });
    
    this.originalData = { ...this.data }; 
   
    this.vgkForm.patchValue({
      transportNumber: this.data?.transportNumber,
      trailerNumber: this.data?.trailerNumber,
      creatingDate: this.data?.creatingDate,
      recordingMethod: this.data?.recordingMethod,
      totalWeight: this.data?.totalWeight,
      violation: this.data?.violation,
      weighingType: this.data?.weighingType,
      status: this.data?.status,
      euro: this.data?.euro,
      modifierType: this.data?.modifierType,
      axles: this.data?.axles,
      photos: this.data?.photos,
      dimensions: this.data?.dimensions,
      overload: this.data?.overload,
      transitViolations: this.data?.transitViolations,
      addInfo: this.data?.addInfo,
      prevVerID: this.data?.prevVerID,
      actNumber: this.data?.actNumber,
      category: this.data?.category,
      vehicleTstk: this.data?.vehicleTstk,
    });
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {
  }

  onSave(): void {
    const formData = { ...this.vgkForm.value} ;
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(this.originalData);

    if (isFormChanged) {
      this.http.post(`http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk`, {data:{...formData}}).subscribe(response => {
        console.log('Ответ на PUT запрос:', response);
      });
    } else {
      const id = this.data.id; 
      this.http.post(`http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk/${id}`, { id }).subscribe(response => {
        console.log('Ответ на PUT запрос (только ID):', response);
      });
    }
  }

}
