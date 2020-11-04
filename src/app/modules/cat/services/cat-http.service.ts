import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {VoteDto} from '@cat/dto/vote-dto';
import {ImageDto} from '@cat/dto/image-dto';
import {environment} from '@env/environment';
import {CatsDto} from '../dto/cats-dto';

@Injectable({
  providedIn: 'root'
})
export class CatHttpService {

  constructor(private http: HttpClient) { }

  getBreedsByName(name: string): Observable<CatsDto[]> {
    return this.http.get<CatsDto[]>(`${environment.apiUrl}breeds/search?q=${name}`);
  }

  getImage(): Observable<ImageDto[]> {
    return this.http.get<ImageDto[]>(`${environment.apiUrl}images/search?limit=1&size=full`);
  }

  postVote(request: VoteDto) {
    return this.http.post(`${environment.apiUrl}votes`, request);
  }

  getVotes(subId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}votes?sub_id=${subId}`);
  }
}
