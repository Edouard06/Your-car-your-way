import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LiveSupportComponent } from './components/talkjs-chat/talkjs-chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LiveSupportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'YOUR-CAR-YOUR-WAY';

  @ViewChild(LiveSupportComponent) supportChat!: LiveSupportComponent;

  constructor(private router: Router) {}

  onToggleChanged(event: Event): void {
    const toggled = (event.target as HTMLInputElement).checked;
    this.supportChat.supportMode = toggled;
    this.supportChat.reloadChat();
  }
}
