import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  endpoint = 'http//localhost:8080/songs';

  constructor(private httpClient: HttpClient) { }

  getSongs() {
    return this.httpClient.get(this.endpoint);
  }
}
