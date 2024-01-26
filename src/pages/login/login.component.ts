import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,

  ],
  providers: [AuthService, Router],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  value = '';
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService : AuthService, private router : Router) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: () => {
          console.log('Authentication successful');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.originalError || err.message;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
