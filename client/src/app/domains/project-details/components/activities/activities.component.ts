import {Component, inject, Input, Signal} from '@angular/core';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {FormsModule} from '@angular/forms';
import {ActivityTree} from '../activity-tree/activity-tree';

@Component({
  selector: 'app-activities',
  imports: [
    FormsModule,
    ActivityTree
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
})
export class Activities {
  @Input()
  public commentsTree!: Signal<ActivityNodeInterface[]>;

  @Input()
  public projectId!: string;
}
