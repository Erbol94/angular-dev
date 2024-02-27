import { Component, OnInit, inject, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PhotoRecordingService } from '../../../../shared/services/photo-recording-service/photo-recording.service';
import { ImageDownloadService } from '../../../../shared/services/image-service/image-download.service';

@Component({
  selector: 'app-photo-recording-view',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './photo-recording-view.component.html',
  styleUrl: './photo-recording-view.component.scss',
})
export class PhotoRecordingViewComponent implements OnInit {
  service: PhotoRecordingService = inject(PhotoRecordingService);
  data: any;
  originalData: any;
  photoForm: FormGroup;
  isLoading: boolean = false;
  isReadOnly: boolean = true;
  isDisabled: boolean = true;
  isEdit: string = 'Редактировать';
  url =
    'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.PhotoRecording';

  image: string | null = null;
  imageUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private imageService: ImageDownloadService
  ) {
    this.initializeData();
  }

  ngOnInit(): void {
    // this.imageService.clearImageCache();

    this.photoForm = this.fb.group({
      createTime: [''],
      directionMovVehicle: [''],
      id: [''],
      recordingMethod: [''],
      removed: [''],
      removedBy: [''],
      removedTime: [''],
      snapshotTime: [''],
      syscode: [''],
      updateTime: [''],
      vehicleColor: [''],
      vehicleCountry: [''],
      vehicleModel: [''],
      vehicleNumber: [''],
      vehiclePhoto: [''],
      vehiclePhotoLicensePlate: [''],
      vehicleType: [''],
    });

    this.originalData = { ...this.data };

    this.photoForm.patchValue({
      createTime: this.data?.createTime,
      directionMovVehicle: this.data?.directionMovVehicle,
      id: this.data?.id,
      recordingMethod: this.data?.recordingMethod,
      removed: this.data?.removed,
      removedBy: this.data?.removedBy,
      removedTime: this.data?.removedTime,
      snapshotTime: this.data?.snapshotTime,
      syscode: this.data?.syscode,
      updateTime: this.data?.updateTime,
      vehicleColor: this.data?.vehicleColor,
      vehicleCountry: this.data?.vehicleCountry,
      vehicleModel: this.data?.vehicleModel,
      vehicleNumber: this.data?.vehicleNumber,
      vehiclePhoto: this.data?.vehiclePhoto,
      vehiclePhotoLicensePlate: this.data?.vehiclePhotoLicensePlate,
      vehicleType: this.data?.vehicleType,
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  clearCacheOnUnload(event: Event): void {
    this.imageService.clearImageCache(`vehiclePhoto_${this.data.vehiclePhoto.id}`); 
  }

  initializeData(): void {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.service.postDataById(this.url, id).subscribe((res: any) => {
      this.data = res.data[0];
      this.photoForm.patchValue(this.data);
      this.isLoading = false;

      const id = this.data.vehiclePhoto.id;
      this.imageService.clearImageCache(`vehiclePhoto_${id}`);
      const key = `vehiclePhoto_${id}`;

      const savedImage = this.imageService.getImageFromLocalStorage(key);
      if (savedImage) {
        this.image = savedImage;
      } else {
        this.loadImageAndSave(id, key);
      }
    });
  }

  loadImageAndSave(id: number, key: string): void {
    const imageUrl = `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.meta.db.MetaFile/${id}/content/download?v=0&parentId=388134&parentModel=com.axelor.apps.registration.db.PhotoRecording`; // Construct your URL here
    this.imageService
      .loadImageAndSaveToLocalStorage(imageUrl, key)
      .then(() => {
        this.image =
          this.imageService.getImageFromLocalStorage(key);
      })
      .catch((error: any) => {
        console.error('Failed to load or save the image.', error);
      });
  }

  onSave(): void {
    const formData = { ...this.photoForm.value, id: this.data.id };
    const isFormChanged =
      JSON.stringify(formData) !== JSON.stringify(this.originalData);

    if (isFormChanged) {
      this.http.post('', { data: { ...formData } }).subscribe((response) => {
        console.log('Ответ на PUT запрос:', response);
      });
    } else {
      const id = this.data.id;
      this.http.post('', { id }).subscribe((response) => {
        console.log('Ответ на PUT запрос (только ID):', response);
      });
    }
  }

  toogleFunction(): void {
    this.isReadOnly ? (this.isReadOnly = false) : (this.isReadOnly = true);
    this.isDisabled ? (this.isDisabled = false) : (this.isDisabled = true);
    this.isReadOnly
      ? (this.isEdit = 'Редактировать')
      : (this.isEdit = 'Сохранить');
  }

  getPhotoById(): string {
    return `http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.meta.db.MetaFile/${this.data?.vehiclePhoto?.id}/content/download`;
  }
}
