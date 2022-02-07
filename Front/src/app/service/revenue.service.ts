import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revenue } from '../models/Revenue';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(
    private api: ApiService
  ) { }

  store(revenue: Revenue): Observable<Revenue> {
    return this.api.post('revenue', revenue);
  }

  index(): Observable<Revenue[]> {
    return this.api.get('revenue');
  }

  show(id: number): Observable<Revenue> {
    return this.api.get('revenue/' + `${id}`);
  }

  update(revenue: Revenue, id: any): Observable<any> {
    return this.api.put(`revenue/${id}`, revenue);
  }

  destroy(id: number): Observable<any> {
    return this.api.delete('revenue/', `${id}`);
  }
}
