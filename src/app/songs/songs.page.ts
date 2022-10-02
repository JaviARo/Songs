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
  searchedSong: any;

  // updateSongFg: FormGroup;
  // id: any;

  constructor(
    private songService: SongService, 
    private router: Router,
    // private activatedRoute: ActivatedRoute,
    // public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    this.songService.getSongs().subscribe(response => {
      this.songs = response;
      this.searchedSong = this.songs;
      //console.log(this.songs.name);
    });
  }

  ionViewDidEnter() {
    this.songService.getSongs().subscribe((response) => {
      this.songs = response;
    })
  }

  removeSong(song, i) {
    if (window.confirm('Are you sure')) {
      this.songService.deleteSong(song.id)
      .subscribe(() => {
          this.getAllSongs();
          console.log('User deleted!')
        }
      )
    }
  }

  gotoAddSong() {
    this.router.navigateByUrl("/add-song");
  }

  gotoUpdateSong() {
    this.router.navigateByUrl("/update-song");
  }

  searchSongs(event){
    const text = event.target.value;
    this.searchedSong = this.songs;
    if(text && text.trim() != ''){
      this.searchedSong = this.searchedSong.filter((song: any)=>{
        return(song.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  // changeFavourite() {
  //   this.fetchSong(this.id);
  //   this.updateSongFg = this.formBuilder.group({
  //     favourite: ['']
  //   })
  // }

  // fetchSong(id) {
  //   this.songService.getSong(id).subscribe((data) => {
  //     this.updateSongFg.setValue({
  //       name: data['favourite']
  //     });
  //   });
  // }

  // onSubmit() {
  //   if (!this.updateSongFg.valid) {
  //     return false;
  //   } else {
  //     this.songService.updateSong(this.id, this.updateSongFg.value)
  //       .subscribe(() => {
  //         this.updateSongFg.reset();
  //       })
  //   }
  // }
  
}
