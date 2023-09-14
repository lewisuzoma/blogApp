import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [CommonModule, AlertModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent implements OnInit {
  @Input() type: any;
  @Input() message: any;

  dismissible = true;
  defaultAlerts: any[] = [
    {
      type: '',
      msg: ''
    }
  ];

  constructor() {
      
  }

  ngOnInit(): void {
    // this.defaultAlerts[0].type = this.type
    // this.defaultAlerts[0].msg = this.message

  }

  onClosed(dismissedAlert: any): void {
    // this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
