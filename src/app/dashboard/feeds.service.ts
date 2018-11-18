import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  API_URL = 'http://localhost:3000';

  constructor(private  httpClient:  HttpClient) { }

  getFeeds() {
    return this.httpClient.get(`${this.API_URL}/headlines`);
  }
}
