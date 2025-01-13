import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = 'http://localhost:8080/api/materiales';

  constructor(private http: HttpClient) { }

  getAllMaterials(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(catchError(this.handleError));
  }

  getFilteredMaterials(filters: any): Observable<any[]> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params });
  }

  getMaterialById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  filterMaterials(params: any): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/filter`, { params })
      .pipe(catchError(this.handleError));
  }

  createMaterial(material: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}`, material)
      .pipe(catchError(this.handleError));
  }

  updateMaterial(id: number, material: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, material)
      .pipe(catchError(this.handleError));
  }

  //Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
