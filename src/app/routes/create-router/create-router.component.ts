import { Component } from '@angular/core';
import { CreateRouterFormComponent } from '../../common/forms/create-router/create-router.component-form';

@Component({
    selector: 'app-create-router',
    standalone: true,
    templateUrl: './create-router.component.html',
    styleUrl: './create-router.component.css',
    imports: [CreateRouterFormComponent],
})
export class CreateRouterComponent {}
