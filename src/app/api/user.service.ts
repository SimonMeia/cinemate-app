import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getAllUserGroups(userId: string): Observable<Group[]> {
    const url = `${environment.apiUrl}/users/${userId}/groups`;
    return this.http.get<Group[]>(url);
  }
  joinGroup(groupId: string): Observable<any> {
    const url = `${environment.apiUrl}/users/groups/${groupId}`;
    return this.http.post<any>(url, {});
  }
  quitGroup(groupId: string): Observable<any> {
    const url = `${environment.apiUrl}/users/groups/${groupId}`;
    return this.http.delete<any>(url, {});
}
addUser(userData: any){
      const url = `${environment.apiUrl}/users`;
      return this.http.post<any>(url, userData);
  }
}
