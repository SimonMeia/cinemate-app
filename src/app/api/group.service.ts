import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/genre copy';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

    constructor(private http: HttpClient) {}

  getAllUserGroups(id: string): Observable<Group[]> {
    const url = `${environment.apiUrl}/users/${id}/groups`;
    return this.http.get<Group[]>(url);
  }
}
