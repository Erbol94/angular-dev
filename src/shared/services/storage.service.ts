import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {constants} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {
    const token = this.getCsrfToken();
    if (token) {
      this.updateCsrfToken(true);
    }
  }

  getCsrfToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN);
  }

  setCsrfToken(token: any): void {
    this.updateCsrfToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token);
  }

  updateCsrfToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  removeCsrfToken() {
    this.updateCsrfToken(false);
    localStorage.removeItem(constants.CURRENT_TOKEN);
  }
}
