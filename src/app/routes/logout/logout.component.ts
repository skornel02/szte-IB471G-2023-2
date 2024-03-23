import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterAuthService } from '../../services/router-auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  constructor(private auth: RouterAuthService) { }

  ngOnInit(): void {
    this.auth.logout();
  }

}
