import {Component, inject, OnInit} from '@angular/core';
import {ActivityService} from '../../core/services/api/activity.service';
import {ActivityCard} from '../../shared/activity-card/activity-card';

@Component({
  selector: 'app-main',
  imports: [
    ActivityCard
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit{

  private readonly acitvityService = inject(ActivityService);
  protected readonly pendingFiles = this.acitvityService.pendingFiles;

  public ngOnInit(): void {
    this.acitvityService.loadPendingFiles()
  }


}
