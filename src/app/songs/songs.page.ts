import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  songs: any = [];

  constructor(
    private songService: SongService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    this.songService.getSongs().subscribe(response => {
      this.songs = response;
      //console.log(this.songs.name);
    });
  }

  // ionViewDidEnter() {
  //   this.songService.getSongs().subscribe((response) => {
  //     this.Songs = response;
  //   })
  // }

  // removeSong(song, i) {
  //   if (window.confirm('Are you sure')) {
  //     this.songService.deleteSong(song.id)
  //     .subscribe(() => {
  //         this.getAllSongs();
  //         console.log('User deleted!')
  //       }
  //     )
  //   }
  // }

  gotoAddSong() {
    this.router.navigateByUrl("/add-song");
  }

  gotoUpdateSong() {
    this.router.navigateByUrl("/update-song");
  }
  
}
