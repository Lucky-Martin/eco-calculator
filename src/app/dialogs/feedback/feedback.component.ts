import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  comment!: string;
  rating: number = 0;

  constructor(private dialogRef: MatDialogRef<FeedbackComponent>) { }

  ngOnInit(): void { }

  onClose() {
    this.dialogRef.close();
  }

  onSend() {
    this.dialogRef.close({rating: this.rating, comment: this.comment});
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }
}
