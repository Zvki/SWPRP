import {inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {ProjectService} from './project.service';
import {ActivityService} from './activity.service';
import Docxtemplater = require('docxtemplater');
import PizZip = require('pizzip');
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly SPRING_BOOT_BASE_URL = '/swprp/resource';
  private readonly project = inject(ProjectService).project;
  private readonly meetings = inject(ActivityService).meetings;

  private readonly DOWNLOAD_ENDPOINT = '/download';

  private readonly http = inject(HttpClient);

  public getFile(fileUrl: string): Observable<Blob> {
    const fullDownloadUrl =
      `${this.SPRING_BOOT_BASE_URL}${this.DOWNLOAD_ENDPOINT}?fileUrl=${encodeURIComponent(fileUrl)}`;
    return this.http.get(fullDownloadUrl, { responseType: 'blob' });
  }


  public async getReport(): Promise<void> {
    const project = this.project();
    const meetings = this.meetings();

    if (!project) {
      console.warn('Brak projektu - nie można wygenerować raportu.');
      return;
    }

    try {
      const templatePath = '/report-template.docx';

      const templateContent = await firstValueFrom(
        this.http.get(templatePath, { responseType: 'arraybuffer' })
      );

      const zip = new PizZip(templateContent);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const data = {
        studenci: project.members?.map( m => ({
          imie: m.student.firstName,
          nazwisko: m.student.lastName,
          })
        ) || [],
        kierunek: 'Informatyka',
        semestr:  '7',
        rok: '2025/2026',
        promotor: project.supervisor!.firstName + ' ' + project.supervisor!.lastName,
        temat: project.title || '',

        konsultacje: meetings?.map(m => ({
          data: m.date ? new Date(m.date).toLocaleDateString('pl-PL') : '',
          tresc: m.note || '',
        })) || []
      };

      doc.render(data);

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(out, `Karta_Konsultacji_${project.title}.docx`);
    } catch (error) {
      console.error('Błąd generowania raportu:', error);
    }
  }
}
