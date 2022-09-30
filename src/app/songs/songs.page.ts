import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  songs: any = [];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    this.songService.getSongs().subscribe(response => {
      this.songs = response;
    });
  }

  
}
