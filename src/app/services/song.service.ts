import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Song {
  _id: number;
  name: string;
  duration: string;
  album: string;
  authors: string;
  // favourite: string;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {

  endpoint = 'http://localhost:8080/songs';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  
  constructor(private httpClient: HttpClient) { }

  createSong(song: Song): Observable<any> {
    const data = new URLSearchParams();
    data.append("name",song.name);
    data.append("duration",song.duration);
    data.append("authors",song.authors);
    data.append("album",song.album);
    data.append("cover",song.cover);
    return this.httpClient.post<Song>(this.endpoint, data.toString(), this.httpOptions)
      .pipe(
        catchError(this.handleError<Song>('Error occured'))
      );
  }

  getSong(id): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Song[]>(`Get song id=${id}`))
      );
  }

  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.endpoint)
      .pipe(
        tap(songs => console.log('Songs retrieved!')),
        catchError(this.handleError<Song[]>('Get song', []))
      );
  }

  updateSong(id, song: Song): Observable<any> {
    const data = new URLSearchParams();
    data.append("name",song.name);
    data.append("duration",song.duration);
    data.append("authors",song.authors);
    data.append("album",song.album);
    data.append("cover",song.cover);
    return this.httpClient.put(this.endpoint + '/' + id, data.toString(), this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song updated: ${id}`)),
        catchError(this.handleError<Song[]>('Update song'))
      );
  }

  // updateFavourite(id, song: Song): Observable<any> {
  //   const data = new URLSearchParams();
  //   data.append("favourite",song.favourite);
  //   return this.httpClient.put(this.endpoint + '/' + id, data.toString(), this.httpOptions)
  //     .pipe(
  //       tap(_ => console.log(`Song updated: ${id}`)),
  //       catchError(this.handleError<Song[]>('Update song'))
  //     );
  // }

  deleteSong(id): Observable<Song[]> {
    return this.httpClient.delete<Song[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song deleted: ${id}`)),
        catchError(this.handleError<Song[]>('Delete song'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
