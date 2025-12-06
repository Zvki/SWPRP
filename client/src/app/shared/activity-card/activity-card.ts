import {Component, inject, Input} from '@angular/core';
import {ButtonDirective} from '../ui/button/button-directive';
import {DatePipe} from '@angular/common';
import {ActivityType} from '../../core/interfaces/activity/activity.interface';
import {ActivityNodeInterface} from '../../core/interfaces/activity/activity-node.interface';
import {ResourceService} from '../../core/services/api/resource.service';

@Component({
  selector: 'app-activity-card',
  imports: [
    ButtonDirective,
    DatePipe
  ],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.css',
})
export class ActivityCard {
  @Input({ required: true })
  public node!: ActivityNodeInterface;

  private readonly resourceService = inject(ResourceService);
  protected readonly ActivityType = ActivityType;

  protected onViewClick(fileUrl: string): void {
    this.resourceService.getFile(fileUrl)
      .subscribe({
        next: (blobData: Blob) => {
          const url = window.URL.createObjectURL(blobData);
          window.open(url, '_blank');
        },
        error: (err) => {
          console.error('Błąd podglądu pliku:', err);
        }
      });
  }
}
