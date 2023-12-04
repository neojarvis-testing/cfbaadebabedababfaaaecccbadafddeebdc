import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { Team } from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private baseUrl = 'https://8080-aeaadfacfbfcbdbdddeeefcbbdfefcbfbfaadecbbecc.premiumproject.examly.io/api/organizer'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getUnsoldPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/unsold-players`);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`https://8080-aeaadfacfbfcbdbdddeeefcbbdfefcbfbfaadecbbecc.premiumproject.examly.io/api/admin/teams`);
  }

  assignPlayerToTeam(playerId: number, teamId: number): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}/assign-player?playerId=${playerId}&teamId=${teamId}`, {});
  }

  releasePlayerFromTeam(playerId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/release-player/${playerId}`, {});
  }

}
