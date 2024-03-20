import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
      
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Post } from './post';
    
@Injectable({
  providedIn: 'root'
})
export class PostService {
    
  private apiURL = "http://127.0.0.1:3000";
      

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
     

  constructor(private httpClient: HttpClient) { }
      

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
      

  create(post: Post): Observable<any> {
    console.log('Post a crear:', post);
    return this.httpClient.post<any>(`${this.apiURL}/posts/create`, post, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('Ha ocurrido un error:', error);
    return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.'); // Puedes personalizar este mensaje de error según tus necesidades
  }

  

  find(id:number): Observable<any> {

  
    return this.httpClient.get(this.apiURL + '/posts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    

  update(id:number, post:Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
      

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}