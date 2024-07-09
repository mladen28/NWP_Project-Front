import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddRequest,
  ErrorMessage,
  VacuumControl,
  ScheduleParameters,
} from "../models";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VacuumControlService {

  private headers

  constructor(private httpClient: HttpClient){
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }

  public getAll(mail: string): Observable<VacuumControl[]>{
    const params = new HttpParams().set('mail',mail)
    console.log(params)
    return this.httpClient.get<VacuumControl[]>(`${environment.apiVacuumControlServerUrl}/get`,{ headers: this.headers, params: params })
  }

  public getErrorMessagesForUser(mail: string): Observable<ErrorMessage[]>{
    const params = new HttpParams().set('mail',mail)
    console.log(params)
    return this.httpClient.get<ErrorMessage[]>(`${environment.apiVacuumControlServerUrl}/errors`,{ headers: this.headers, params: params })
  }

  public scheduleVacuumControl(scheduleRequest: ScheduleParameters): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiVacuumControlServerUrl}/schedule`,scheduleRequest,{headers: this.headers} );
  }

  public addVacuumControl(addRequest: AddRequest): Observable<VacuumControl>{
    return this.httpClient.post<VacuumControl>(`${environment.apiVacuumControlServerUrl}/add`,addRequest ,{ headers: this.headers });
  }

  public startVacuumControl(id: number): Observable<VacuumControl>{
    return this.httpClient.get<VacuumControl>(`${environment.apiVacuumControlServerUrl}/start/${id}`, { headers: this.headers });
  }

  public stopVacuumControl(id: number): Observable<VacuumControl>{
    return this.httpClient.get<VacuumControl>(`${environment.apiVacuumControlServerUrl}/stop/${id}`, { headers: this.headers });
  }

  public dischargeVacuumControl(id: number): Observable<VacuumControl>{
    return this.httpClient.get<VacuumControl>(`${environment.apiVacuumControlServerUrl}/discharge/${id}`, { headers: this.headers });
  }

  public removeVacuumControl(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${environment.apiVacuumControlServerUrl}/remove/${id}`, { headers: this.headers });
  }

  public searchVacuums(mail: string, name: string, status: any, dateFrom: any, dateTo: any): Observable<VacuumControl>{
    let url = new URL(`${environment.apiVacuumControlServerUrl}/get_filtered`)
    url.searchParams.append('mail',mail)
    url.searchParams.append('name',name)
    console.log(url)
    if (status != null) url.searchParams.append('status',status)
    if (dateFrom != null) url.searchParams.append('dateFrom',dateFrom)
    if (dateTo != null) url.searchParams.append('dateTo',dateTo)
    return this.httpClient.get<VacuumControl>(`${url}`, { headers: this.headers,  });
  }

}
