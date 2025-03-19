import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;
  imageUrl!: string;
  snapButtonText!: string;
  userHasSnapped!: boolean;
// ...

  ngOnInit() {
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depuis toujours !';
    this.createdAt = new Date();
    this.snaps = 5;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.snapButtonText = 'Oh Snap ! ';
    this.userHasSnapped = false;
  }
  onSnap() {
    if (this.userHasSnapped) {
      this.snap
    } else {
      this.unSnap
    }
  }
unSnap() {
    this.snaps--;
    this.snapButtonText = 'Oh Snap !';
    this.userHasSnapped = false;
}
snap () {
  this.snaps++;
  this.snapButtonText = 'Unsnap !';
  this.userHasSnapped = true;
}
}