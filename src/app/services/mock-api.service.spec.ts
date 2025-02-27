import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockDataUrl = 'assets/mock-data.json'; // Path to mock JSON file

  constructor(private http: HttpClient) {}

  // Fetch mock user data from the JSON file
  getMockUser(): Observable<any> {
    return this.http.get<any>(this.mockDataUrl);
  }
}
