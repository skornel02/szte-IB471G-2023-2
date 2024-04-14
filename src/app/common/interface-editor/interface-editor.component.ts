import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Interface from '../../data/interface';
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
import { FormErrorPipe } from '../../pipes/form-error.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ipValidator } from '../../helpers/ip.validator';
import Bridge from '../../data/bridge';
import { DatabaseService } from '../../services/database.service';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from '../../services/business.service';

@Component({
    selector: 'app-interface-editor',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        FormErrorPipe,
    ],
    templateUrl: './interface-editor.component.html',
    styleUrl: './interface-editor.component.css',
})
export class InterfaceEditorComponent implements OnChanges {
    @Input()
    routerId: string = null!;

    @Input()
    bridgeList: Bridge[] = null!;

    @Input()
    interface: Interface | null = null;

    routerForm: FormGroup = null!;

    constructor(
        private fb: FormBuilder,
        private db: DatabaseService,
        private toastr: ToastrService,
        private business: BusinessService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.interface);

        this.routerForm = this.fb.group({
            mode: [this.interface?.mode, { validators: [Validators.required] }],
            ipAddress: [this.interface?.ipAddress, { validators: [ipValidator] }],
            netmask: [this.interface?.netmask, { validators: [ipValidator] }],
            gateway: [this.interface?.gateway, { validators: [ipValidator] }],
            master: [this.interface?.master?.id],
        });
    }

    ngOnInit(): void {}

    async onSubmit() {
        if (!this.interface) {
            return;
        }

        if (this.routerForm.value.mode === 'DHCP') {
            this.routerForm.value.ipAddress = null;
            this.routerForm.value.netmask = null;
            this.routerForm.value.gateway = null;
        }

        if (this.routerForm.value.mode !== 'Slave') {
            this.routerForm.value.master = null;
        } else {
            this.routerForm.value.master = this.db.getInterfaceReference(
                this.routerId,
                this.routerForm.value.master
            );
        }

        const newInterface: Interface = {
            name: this.interface.name,
            mode: this.routerForm.value.mode,
            ipAddress: this.routerForm.value.ipAddress,
            netmask: this.routerForm.value.netmask,
            gateway: this.routerForm.value.gateway,
            master: this.routerForm.value.master,
            type: this.interface.type,
        };

        try {
            await this.db.updateInterface(this.routerId, newInterface);

            this.toastr.success('Interface updated!', 'Success!');

            await this.business.recalculateRoutes(this.routerId);
        } catch (error) {
            this.toastr.error('Error updating interface!', 'Error!');
            console.error('Error updating interface: ', error);
        }
    }
}
