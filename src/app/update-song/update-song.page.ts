import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SongService } from './../services/song.service';


@Component({
  selector: 'app-update',
  templateUrl: './update-song.page.html',
  styleUrls: ['./update-song.page.scss'],
})

export class UpdateSongPage implements OnInit {

  updateSongFg: FormGroup;
  id: any;

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchSong(this.id);
    this.updateSongFg = this.formBuilder.group({
      name: [''],
      duration: [''],
      authors: [''],
      album: [''],
      cover: ['']
    })
  }

  fetchSong(id) {
    this.songService.getSong(id).subscribe((data) => {
      this.updateSongFg.setValue({
        name: data['name'],
        duration: data['duration'],
        authors: data['authors'],
        album: data['album'],
        cover: data['cover']
      });
    });
  }

  onSubmit() {
    if (!this.updateSongFg.valid) {
      return false;
    } else {
      this.songService.updateSong(this.id, this.updateSongFg.value)
        .subscribe(() => {
          this.updateSongFg.reset();
          this.router.navigate(['/songs']);
        })
    }
  }

  gotoSongs() {
    this.router.navigateByUrl("/songs");
  }

}