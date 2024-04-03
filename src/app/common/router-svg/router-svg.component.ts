import { Component } from '@angular/core';
import { InterfaceStatus } from '../../data/interface';

@Component({
  selector: 'app-router-svg',
  standalone: true,
  imports: [],
  templateUrl: './router-svg.component.html',
  styleUrl: './router-svg.component.css'
})
export class RouterSvgComponent {
  interface1Status: InterfaceStatus = 'Up';
  interface2Status: InterfaceStatus = 'Down';
  interface3Status: InterfaceStatus = 'Invalid';
  interface4Status: InterfaceStatus = 'Down';
  interface5Status: InterfaceStatus = 'Up';

  handleInterfaceClick(interfaceNumber: number) {
    console.log(`Interface ${interfaceNumber} clicked`);
  }
}
