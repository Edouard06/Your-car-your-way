import { Component } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}