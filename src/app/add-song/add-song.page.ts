import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})
export class AddSongPage implements OnInit {

  songForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private songService: SongService,
  ) {
    this.songForm = this.formBuilder.group({
      name: [''],
      duration: [''],
      authors: [''],
      album: [''],
      cover: ['']
    })
   }
  ngOnInit() {}
  
  onSubmit() {
    if (!this.songForm.valid) {
      return false;
    } else {
      this.songService.createSong(this.songForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.songForm.reset();
          })
        });
    }
  }

  gotoSongs() {
    this.router.navigateByUrl("/songs");
  }
}
