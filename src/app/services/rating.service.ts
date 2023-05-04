import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  rating = new Subject<number>();

  constructor() { }

  fetchRating() {
    const fetchedRating = parseInt(window.localStorage.getItem("rating")!);
    this.rating.next(fetchedRating);
  }

  saveRating(newRating: number){
    window.localStorage.setItem("rating", newRating.toString())
  }

  getRating() {
    let emittedValue;
    this.rating.subscribe(value => emittedValue = value);
    return emittedValue;
  }

  setRating(newRating: number){
    this.saveRating(newRating);
    this.rating.next(newRating);
  }
}
