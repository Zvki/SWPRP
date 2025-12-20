import {Component, inject, Input} from '@angular/core';
import {ActivityNode} from '../activity-node/activity-node';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {ScreenSizeService} from '../../../../core/services/screen-size.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-activity-tree',
  imports: [
    ActivityNode,
    NgClass
  ],
  templateUrl: './activity-tree.html',
  styleUrl: './activity-tree.css',
})
export class ActivityTree {
  private readonly isMobile = inject(ScreenSizeService).isMobile();
  protected collapsedNodeIds = new Set<string>();

  @Input({ required: true })
  public list: ActivityNodeInterface[] = [];

  @Input({ required: true })
  public projectId!: string;

  @Input() level: number = 0;

  protected get shouldIndent(): boolean {
    return this.level < (this.isMobile ? 2 : 4);
  }

  protected toggleCollapse(nodeId: string) {
    if (this.collapsedNodeIds.has(nodeId)) {
      this.collapsedNodeIds.delete(nodeId);
    } else {
      this.collapsedNodeIds.add(nodeId);
    }
  }

  isCollapsed(nodeId: string): boolean {
    return this.collapsedNodeIds.has(nodeId);
  }
}
