import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent {
  @Input('currentRating') currentRating!: number;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  highlightStar(star: number) {
    this.currentRating = star;
  }

  resetStars() {
    this.currentRating = 1;
  }

  rate(star: number) {
    this.ratingChange.emit(star);
  }
}
