import {Component, Input} from '@angular/core';
import {ActivityNode} from '../activity-node/activity-node';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';

@Component({
  selector: 'app-activity-tree',
  imports: [
    ActivityNode
  ],
  templateUrl: './activity-tree.html',
  styleUrl: './activity-tree.css',
})
export class ActivityTree {
  @Input({ required: true })
  public list: ActivityNodeInterface[] = [];

  @Input({ required: true })
  public projectId!: string;
}
