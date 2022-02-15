import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'})
export class UploadFileService {
  private baseUrl = 'http://localhost:8090';
  constructor(private https: HttpClient) { }
  upload(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', `${this.baseUrl}/user/addDocuments`, data, {
    reportProgress: true,
    responseType: 'text'
    });
    return this.https.request(newRequest);
}

getFiles(): Observable<any> {
  return this.https.get(`${this.baseUrl}/files`);
}

}