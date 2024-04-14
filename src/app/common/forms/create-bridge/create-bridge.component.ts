import { Component, Inject, inject } from '@angular/core';
import { FormErrorPipe } from '../../../pipes/form-error.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from 'express';
import { DatabaseService } from '../../../services/database.service';
import { ToastrService } from 'ngx-toastr';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BusinessService } from '../../../services/business.service';

@Component({
    selector: 'app-create-bridge',
    standalone: true,
    templateUrl: './create-bridge.component.html',
    styleUrl: './create-bridge.component.css',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormErrorPipe,
    ],
})
export class CreateBridgeComponent {
    private database: DatabaseService = inject(DatabaseService);
    private toastr: ToastrService = inject(ToastrService);
    routerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private business: BusinessService,
        private dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA) private data: { routerId: string }
    ) {
        this.routerForm = this.fb.group({
            bridgeName: ['', { validators: [Validators.required, Validators.minLength(4)] }],
            interfaceName: ['', { validators: [Validators.required, Validators.minLength(4)] }],
        });
    }

    async onSubmit() {
        if (this.routerForm.valid) {
            try {
                const router = await this.database.addBridge(
                    this.data.routerId,
                    this.routerForm.value.bridgeName,
                    this.routerForm.value.interfaceName
                );

                this.toastr.success('Bridge created!', 'Success!');
                console.log('Bridge created: ', router);

                await this.business.recalculateRoutes(this.data.routerId);

                this.dialogRef.close('success');
            } catch (error) {
                this.toastr.error('Error creating router!', 'Error!');
                console.error('Error creating router: ', error);
            }
        }
    }
}
