import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ErrorPipePipe } from '../../pipes/error-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from '@angular/fire/app';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ErrorPipePipe,
    ],
})
export class LoginComponent {
    private auth: Auth = inject(Auth);
    private toastr: ToastrService = inject(ToastrService);
    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', { validators: [Validators.required, Validators.email] }],
            password: ['', { validators: [Validators.required, Validators.minLength(6)] }],
        });
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            try {
                const credential = await signInWithEmailAndPassword(
                    this.auth,
                    this.loginForm.value.email,
                    this.loginForm.value.password
                );

                this.toastr.success('Redirecting you to your page!', 'Successful login!');
                console.log('User is logged in');
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/invalid-credential') {
                        this.toastr.error('User not found!', 'Error logging in!');
                        return;
                    }
                    if (error.code === 'auth/wrong-password') {
                        this.toastr.error('Wrong password!', 'Error logging in!');
                        return;
                    }
                    if (error.code === 'auth/too-many-requests') {
                        this.toastr.error(
                            'Too many requests! Try again later!',
                            'Error logging in!'
                        );
                        return;
                    }
                }
                this.toastr.error(`${error}`, 'Error logging in!');
                console.error('Error logging in:', error);
            }
        }
    }
}
