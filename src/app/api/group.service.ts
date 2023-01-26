import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    const url = `${environment.apiUrl}/groups`;
    return this.http.get<Group[]>(url);
  }
  getAllUsersFromGroup(id: string): Observable<User[]> {
    const url = `${environment.apiUrl}/groups/${id}/users/`;
    return this.http.get<User[]>(url);
  }
  createNewGroup(groupData): Observable<Group> {
    const url = `${environment.apiUrl}/groups`;
    return this.http.post<Group>(url, groupData);
  }
  editGroup(groupId, groupData): Observable<Group> {
    const url = `${environment.apiUrl}/groups/${groupId}`;
    return this.http.patch<Group>(url, groupData);
  }
}
