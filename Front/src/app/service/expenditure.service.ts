import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenditure } from '../models/Expenditure';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  constructor(
    private api: ApiService
  ) { }

  store(expenditure: Expenditure): Observable<Expenditure> {
    return this.api.post('expenditure', expenditure);
  }

  index(id: number): Observable<Expenditure[]> {
    return this.api.get(`expenditure/${id}/all`);
  }

  show(id: number): Observable<Expenditure> {
    return this.api.get('expenditure/' + `${id}`);
  }

  update(expenditure: Expenditure, id: any): Observable<any> {
    return this.api.put(`expenditure/${id}`, expenditure);
  }

  destroy(id: number): Observable<any> {
    return this.api.delete('expenditure/' + `${id}`);
  }
}
