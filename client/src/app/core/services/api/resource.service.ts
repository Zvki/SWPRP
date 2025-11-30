import {inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly SPRING_BOOT_BASE_URL = 'http://localhost:4200/swprp/resource';

  private readonly DOWNLOAD_ENDPOINT = '/download';

  private readonly http = inject(HttpClient);

  public getFile(fileUrl: string): Observable<Blob> {
    const fullDownloadUrl =
      `${this.SPRING_BOOT_BASE_URL}${this.DOWNLOAD_ENDPOINT}?fileUrl=${encodeURIComponent(fileUrl)}`;
    return this.http.get(fullDownloadUrl, { responseType: 'blob' });
  }
}
