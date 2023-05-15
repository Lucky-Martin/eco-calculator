import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  message!: string;

  constructor(private dialogRef: MatDialogRef<FeedbackComponent>,) { }

  ngOnInit(): void { }

  onClose() {
    this.dialogRef.close();
  }

  onSend() {
    this.dialogRef.close(true);
  }
}
