import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let cookieService: CookieService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CookieService],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API', () => {
    const username = 'admin';
    const password = 'admin';

    service.onLogin({
      username,
      password,
    }).subscribe(response => {
      expect(response).toBeTruthy();
      // Другие проверки, если необходимо
    });

    const req = httpTestingController.expectOne('http://192.168.0.82:8080/smart-customs/login.jsp');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush({ /* ваш фейковый ответ */ });
  });

  it('should call logout and delete CSRF-TOKEN cookie', () => {
    spyOn(cookieService, 'delete');

    service.onLogout();

    expect(localStorage.getItem('user')).toBeFalsy();
    expect(cookieService.delete).toHaveBeenCalledWith('AUTH_TOKEN');
  });

  it('should check if user is authenticated', () => {
    spyOn(cookieService, 'get').and.returnValue('fake-csrf-token');

    const isAuthenticated = storageService.isAuthentication.subscribe(
      (value) => value
    );

    expect(isAuthenticated).toBeTruthy();
    expect(cookieService.get).toHaveBeenCalledWith('AUTH_TOKEN');
  });
});
