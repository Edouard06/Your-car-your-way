import { Component, OnInit, OnDestroy } from '@angular/core';
import Talk from 'talkjs';

@Component({
  selector: 'app-live-support',
  standalone: true,
  template: '',
  styles: '',
  imports: [],
})
export class LiveSupportComponent implements OnInit, OnDestroy {
  private sessionInstance!: Talk.Session;
  public supportMode: boolean = false;

  ngOnInit(): void {
    this.loadChatUI();
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  private loadChatUI(): void {
    if (typeof window === 'undefined') return;

    Talk.ready.then(() => {
      const userClient = new Talk.User({
        id: 'client-id',
        name: 'Client Demo',
        email: 'client@example.com',
        photoUrl: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
        role: 'default',
      });

      const userSupport = new Talk.User({
        id: 'support-id',
        name: 'Support Franck',
        email: 'agent@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
        welcomeMessage: 'Bonsoir! Comment puis-je vous aider ?',
        role: 'default',
      });

      const currentUser = this.supportMode ? userSupport : userClient;

      this.sessionInstance = new Talk.Session({
        appId: 'tkYojS3R', 
        me: currentUser,
      });

      const conversation = this.sessionInstance.getOrCreateConversation('your-conv-id');
      conversation.setParticipant(userClient);
      conversation.setParticipant(userSupport);

      const popupChat = this.sessionInstance.createPopup();
      popupChat.select(conversation);
      popupChat.mount({ show: true });
    });
  }

  public reloadChat(): void {
    this.sessionInstance?.destroy();
    this.loadChatUI();
  }

  private teardown(): void {
    this.sessionInstance?.destroy();
  }
}
