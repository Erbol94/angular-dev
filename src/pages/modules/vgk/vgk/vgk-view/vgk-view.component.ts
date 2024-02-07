import { VgkServiceService } from './../../../../../shared/services/vgk-service/vgk-service.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vgk-view',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  templateUrl: './vgk-view.component.html',
  styleUrl: './vgk-view.component.scss',
})
export class VgkViewComponent {
  service: VgkServiceService = inject(VgkServiceService);
  data: any;
  isLoading: boolean = false;

  url = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk';

  constructor(private route: ActivatedRoute) {
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
      console.log(this.data);
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
}
