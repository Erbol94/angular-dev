import { VgkServiceService } from './../../../../../shared/services/vgk-service/vgk-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-vgk-view',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './vgk-view.component.html',
  styleUrl: './vgk-view.component.scss',
})
export class VgkViewComponent implements OnInit {
  service: VgkServiceService = inject(VgkServiceService);
  data: any;
  originalData: any;
  vgkForm!: FormGroup;
  isLoading: boolean = false;
  isReadOnly: boolean = true;
  isDisabled: boolean = true;
  isEdit: string = 'Редактировать'


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

  onSave(): void {
    const formData = { ...this.vgkForm.value, id: this.data.id} ;
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

  url = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk';

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {
    this.initializeData();
  }

  async initializeData() {
    this.isLoading = true;
    const id = parseInt(this.route.snapshot.params['id'], 10);
    try {
      const res: any = await this.service
        .postDataById(this.url, id)
        .toPromise();
      if (res.data[0]) {
        await Promise.all(
          res.data.map(async (item: any) => {
            item.violation = this.getChangeViolation(item.violation);
            item.weighingType = this.getChangeWeightType(item.weighingType);
            item.status = this.getChangeStatus(item.status);

            try {
              item.photos = await this.fetchData(
                `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.VgkPhoto/${id}/fetch`,
                [
                  'photoNumber',
                  'backPhotoNumber',
                  'inPhoto',
                  'backPhoto',
                  'customsDepartment',
                ]
              );
            } catch (error) {
              console.error('Error occurred while fetching photos:', error);
              item.photos = [];
            }

            try {
              item.dimensions = await this.fetchData(
                `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Dimension/${id}/fetch`,
                [
                  'overloadWidth',
                  'overloadHeight',
                  'allowableHeight',
                  'allowableWidth',
                  'allowableLength',
                  'width',
                  'length',
                  'overloadLength',
                  'height',
                  'customsDepartment',
                ]
              );
            } catch (error) {
              console.error('Error occurred while fetching dimensions:', error);
              item.dimensions = [];
            }

            try {
              item.vehicleTstk = await this.fetchData(
                `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.VehicleTstk/${id}/fetch`,
                [
                  'axlesCount',
                  'note',
                  'downhills',
                  'width',
                  'length',
                  'vehicleModel',
                  'height',
                  'customsDepartment',
                ]
              );
            } catch (error) {
              console.error(
                'Error occurred while fetching vehicleTstk:',
                error
              );
              item.vehicleTstk = [];
            }

            try {
              item.axles = await this.fetchData(
                `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Axis/${id}/fetch`,
                [
                  'permissibleLoad',
                  'overloadLoad',
                  'numberAxis',
                  'loadAxis',
                  'customsDepartment',
                ]
              );
            } catch (error) {
              console.error('Error occurred while fetching axles:', error);
              item.axles = [];
            }
          })
        );
      } else {
        this.data = [];
      }
      this.data = res.data[0];
      this.vgkForm.patchValue(this.data)
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchData(url: string, fields: string[]): Promise<any> {
    const response: any = await this.service
      .postData(url, { fields })
      .toPromise();
    return response.data[0];
  }

  getChangeViolation(text: string): string {
    switch (text) {
      case '0':
        return 'Нет нарушений';
      case '1':
        return 'Превышение по общей массе';
      case '2':
        return 'Превышение нагрузки на ось';
      case '3':
        return 'Превышение по общей массе и нагрузке на ось';
      case '4':
        return 'Превышение по габаритам';
      case '5':
        return 'Превышение по габаритам и нагрузке на ось';
      case '6':
        return 'Превышение по габаритам и общей массе';
      case '7':
        return 'Превышение по габаритам, общей массе и нагрузке на ось';
      default:
        return 'Неизвестный статус';
    }
  }

  getChangeWeightType(text: string): string {
    switch (text) {
      case '0':
        return 'Динамическое взвешивание';
      case '1':
        return 'Взвешивание в статике';
      default:
        return 'Неизвестный статус';
    }
  }

  getChangeStatus(text: string): string {
    switch (text) {
      case '0':
        return 'Оформлено';
      case '1':
        return 'Неоформлено';
      default:
        return 'Неизвестный статус';
    }
  }


  toogleFunction(): void {
    this.isReadOnly ? this.isReadOnly = false : this.isReadOnly = true;
    this.isDisabled ? this.isDisabled = false : this.isDisabled = true;
    this.isReadOnly ? this.isEdit = 'Редактировать'  : this.isEdit = 'Сохранить'
  }

}
