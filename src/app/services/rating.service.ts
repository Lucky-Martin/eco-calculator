import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FeedbackComponent} from "../dialogs/feedback/feedback.component";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  rating = new Subject<number>();
  ratingError = new Subject<Error>();


  constructor(private matDialog: MatDialog) { }

  fetchRating() {
    const fetchedRating = parseInt(window.localStorage.getItem("rating")!);
    this.rating.next(fetchedRating);
  }

  getRating() {
    let emittedValue;
    this.rating.subscribe(value => emittedValue = value);
    return emittedValue;
  }

  setRating(newRating: number){
    if(newRating > 1 && newRating < 5){
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
    const dialogRef = this.matDialog.open(FeedbackComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  private saveRating(newRating: number){
    window.localStorage.setItem("rating", newRating.toString())
  }
}
