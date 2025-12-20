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


  public getReport(id: string): void {
    const url = `http://localhost:4200/swprp/project/${id}/report`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (responseBlob: Blob) => {
        const fileURL = URL.createObjectURL(responseBlob);
        const a = document.createElement('a');
        a.href = fileURL;

        a.download = `Raport_Projektu_${id}.docx`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
        console.log('Pobieranie pliku zostało zainicjowane.');
      },
      error: (error) => {
        console.error('Błąd podczas pobierania raportu:', error);
        alert('Nie udało się pobrać raportu. Sprawdź konsolę.');
      }
    });
  }
}
