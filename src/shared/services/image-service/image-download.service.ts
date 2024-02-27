import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageDownloadService {

  constructor(private http: HttpClient) {}

  loadImageAndSaveToLocalStorage(imageUrl: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe(
        (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            localStorage.setItem(key, base64data);
            resolve();
          };
          reader.onerror = () => {
            reject('Failed to read the image.');
          };
          reader.readAsDataURL(imageBlob);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getImageFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearImageCache(key: string): void {
    localStorage.removeItem(key);
  }
}
