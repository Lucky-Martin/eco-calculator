import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FeedbackComponent} from "../dialogs/feedback/feedback.component";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  rating = new Subject<{ rating: number; comment: string }>();
  ratingError = new Subject<Error>();


  constructor(private matDialog: MatDialog) { }

  fetchRating() {
    const fetchedRating = JSON.parse(window.localStorage.getItem("rating")!);
    this.rating.next(fetchedRating);
  }

  getRating() {
    let emittedValue;
    this.rating.subscribe(value => emittedValue = value);
    return emittedValue;
  }

  setRating(rating: {rating: number, comment: string}){
    if(rating.rating >= 1 && rating.rating <= 5){
      const newRating = {rating: rating.rating, comment: rating.comment};
      this.saveRating(newRating);
      this.rating.next(newRating);
    }
    else {
      const currError: Error = {
        name: "Error while setting rating",
        message: "The rating must be number between 1 and 5"
      }
      this.ratingError.next(currError)
    }
  }

  openFeedbackDialog() {
    const dialogRef = this.matDialog.open(FeedbackComponent, {
      height: '70%',
      width: '95%',
      maxWidth: 512,
      maxHeight: 512
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setRating(result);
      }
    });
  }

  private saveRating(rating: {rating: number; comment: string;}){
    window.localStorage.setItem("rating", JSON.stringify(rating));
  }
}
