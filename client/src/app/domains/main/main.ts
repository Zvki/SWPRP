import {Component, effect, inject} from '@angular/core';
import {ActivityService} from '../../core/services/api/activity.service';
import {ActivityCard} from '../../shared/activity-card/activity-card';
import {AuthService} from '../../core/services/api/auth.service';
import {UserRole} from '../../core/interfaces/user-response';
import {FileStatus} from '../../core/interfaces/activity/activity.interface';

@Component({
  selector: 'app-main',
  imports: [
    ActivityCard
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main{

  private readonly acitvityService = inject(ActivityService);
  protected readonly user = inject(AuthService).user;
  protected readonly pendingFiles = this.acitvityService.pendingFiles;
  protected readonly nextMeetings = this.acitvityService.nextMeetings;
  protected isSupervisor = this.user()?.role === UserRole.SUPERVISOR;

  constructor() {
    effect(() => {
      const user = this.user();
      if (!user) return;

      const status = user.role === UserRole.SUPERVISOR
        ? FileStatus.PENDING
        : FileStatus.CHANGES_REQUESTED;

      this.acitvityService.loadFilesByStatus(status);
      this.acitvityService.loadNextMeetings();
    });
  }

  protected readonly UserRole = UserRole;
}
