import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorPipe } from '../../../pipes/form-error.pipe';
import { RouterAuthService } from '../../../services/router-auth.service';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-router',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormErrorPipe,
  ],
  templateUrl: './create-router.component.html',
  styleUrl: './create-router.component.css'
})
export class CreateRouterComponent {
  private router: Router = inject(Router);
  private database: DatabaseService = inject(DatabaseService);
  private toastr: ToastrService = inject(ToastrService);
  routerForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.routerForm = this.fb.group({
          name: ['', { validators: [Validators.required, Validators.minLength(4)] }],
      });
  }

  async onSubmit() {
    if (this.routerForm.valid) {
        try {
            const router = await this.database.createRouter(this.routerForm.value.name);

            this.toastr.success('Router created!', 'Success!');
            console.log('Router created: ', router);

            // Navigate to /routers/:id
            this.router.navigate(['/routers', router.id]);
        } catch (error) {
            this.toastr.error('Error creating router!', 'Error!');
            console.error('Error creating router: ', error);
        }
    }
  }
}
