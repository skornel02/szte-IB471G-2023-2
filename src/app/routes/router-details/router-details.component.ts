import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-router-details',
  standalone: true,
  imports: [],
  templateUrl: './router-details.component.html',
  styleUrl: './router-details.component.css'
})
export class RouterDetailsComponent {
  @Input()
  routerId: string | null = null;
}
