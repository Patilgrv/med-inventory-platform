import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page?: number;
  pageSize?: number;
}

/** Set to true when the backend API is deployed and ready. */
export const API_READY = false;

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '';

  private url(path: string): string {
    return this.baseUrl ? `${this.baseUrl}/${path}` : path;
  }

  get<T>(endpoint: string, params?: QueryParams): Observable<T> {
    if (!API_READY) return of(this.getMock(endpoint) as T);
    return this.http.get<T>(this.url(endpoint), {
      params: this.toHttpParams(params),
    });
  }

  getPaginated<T>(endpoint: string, params?: QueryParams): Observable<PaginatedResult<T>> {
    if (!API_READY) return of({ items: [], totalCount: 0 } as PaginatedResult<T>);
    return this.http.get<PaginatedResult<T>>(this.url(endpoint), {
      params: this.toHttpParams(params),
    });
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    if (!API_READY) return of(this.getMock(endpoint) as T);
    return this.http.post<T>(this.url(endpoint), body);
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    if (!API_READY) return of(this.getMock(endpoint) as T);
    return this.http.put<T>(this.url(endpoint), body);
  }

  patch<T>(endpoint: string, body: unknown): Observable<T> {
    if (!API_READY) return of(this.getMock(endpoint) as T);
    return this.http.patch<T>(this.url(endpoint), body);
  }

  delete<T>(endpoint: string): Observable<T> {
    if (!API_READY) return of(this.getMock(endpoint) as T);
    return this.http.delete<T>(this.url(endpoint));
  }

  /** Empty/mock response when API is not ready (list = [], single = {}). */
  private getMock(endpoint: string): unknown {
    const listPaths = [
      'inventory/expiring', 'inventory/low-stock', 'rol/alerts', 'rol/stockout-predictions',
      'purchase-orders/pending-approvals', 'purchase-orders/sla-breaches',
    ];
    if (listPaths.some(p => endpoint.startsWith(p))) return [];
    return {};
  }

  private toHttpParams(params?: QueryParams): HttpParams {
    if (!params) return new HttpParams();
    let p = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) p = p.set(key, String(value));
    }
    return p;
  }
}
