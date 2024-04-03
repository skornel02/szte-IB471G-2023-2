import { Component, Input } from '@angular/core';
import { RouterSvgComponent } from "../../common/router-svg/router-svg.component";

@Component({
    selector: 'app-router-details',
    standalone: true,
    templateUrl: './router-details.component.html',
    styleUrl: './router-details.component.css',
    imports: [RouterSvgComponent]
})
export class RouterDetailsComponent {
  @Input()
  routerId: string | null = null;
}
