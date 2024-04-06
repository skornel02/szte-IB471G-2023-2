import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterfaceStatus } from '../../data/interface';

const interfaceMap: Record<number, string> = {
  1: 'port1',
  2: 'port2',
  3: 'port3',
  4: 'port4',
  5: 'port5',
  6: 'wifi',
}

@Component({
  selector: 'app-router-svg',
  standalone: true,
  imports: [],
  templateUrl: './router-svg.component.html',
  styleUrl: './router-svg.component.css'
})
export class RouterSvgComponent {
  @Input()
  interface1Status: InterfaceStatus = 'Up';
  @Input()
  interface2Status: InterfaceStatus = 'Down';
  @Input()
  interface3Status: InterfaceStatus = 'Invalid';
  @Input()
  interface4Status: InterfaceStatus = 'Down';
  @Input()
  interface5Status: InterfaceStatus = 'Up';

  @Output()
  interfaceClick = new EventEmitter<string>();

  handleInterfaceClick(interfaceNumber: number) {
    this.interfaceClick.emit(interfaceMap[interfaceNumber]);
  }
}
