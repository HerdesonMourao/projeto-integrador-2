import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private api: ApiService
  ) { }

  store(category: Category): Observable<Category> {
    return this.api.post('category', category);
  }

  index(id: number): Observable<Category[]> {
    return this.api.get(`category/${id}/all`);
  }

  show(id: number): Observable<Category> {
    return this.api.get('category/' + `${id}`);
  }

  update(category: Category, id: any): Observable<any> {
    return this.api.put(`category/${id}`, category);
  }

  destroy(id: number): Observable<any> {
    return this.api.delete('category/' + `${id}`);
  }
}
