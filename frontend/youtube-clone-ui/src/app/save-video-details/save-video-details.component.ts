import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit{

  saveVideoDetailsForm: FormGroup;
  title:FormControl = new FormControl('');
  videoStatus:FormControl = new FormControl('');
  description:FormControl = new FormControl('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  announcer = inject(LiveAnnouncer);

  constructor(){
    this.saveVideoDetailsForm = new FormGroup(
      {
        title: this.title,
        description: this.description,
        videoStatus: this.videoStatus,
      }
    )
  }
  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our string
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag : string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }
}
