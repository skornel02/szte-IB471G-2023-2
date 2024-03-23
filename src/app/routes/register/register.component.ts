import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ErrorPipePipe } from '../../pipes/error-pipe.pipe';
import { confirmPasswordValidator } from '../../helpers/confirm-password.validator';
import { FirebaseError } from '@angular/fire/app';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ErrorPipePipe,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    private auth: Auth = inject(Auth);
    private toastr: ToastrService = inject(ToastrService);
    registerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group(
            {
                email: ['', { validators: [Validators.required, Validators.email] }],
                password: ['', { validators: [Validators.required, Validators.minLength(6)] }],
                passwordAgain: ['', { validators: [Validators.required, Validators.minLength(6)] }],
            },
            { validators: confirmPasswordValidator }
        );
    }

    async onSubmit() {
        console.log(this.registerForm);
        if (this.registerForm.valid) {
            try {
                const credential = await createUserWithEmailAndPassword(
                    this.auth,
                    this.registerForm.value.email,
                    this.registerForm.value.password
                );

                this.toastr.success('Please log in to your account!', 'Register successful!');
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/email-already-in-use') {
                        this.toastr.error('Email already in use!', 'Error registering!');
                        return;
                    }
                    if (error.code === 'auth/invalid-email') {
                        this.toastr.error('Invalid email!', 'Error registering!');
                        return;
                    }
                    if (error.code === 'auth/weak-password') {
                        this.toastr.error('Password is too weak!', 'Error registering!');
                        return;
                    }
                    if (error.code === 'auth/too-many-requests') {
                        this.toastr.error(
                            'Too many requests! Try again later!',
                            'Error registering!'
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
