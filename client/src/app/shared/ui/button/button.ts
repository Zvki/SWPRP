import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonBase, ButtonVariants, ButtonVariantType} from './consts/button-variant.type';
import {ButtonSizes, ButtonSizeType} from './consts/button-size.type';
import {NgClass} from '@angular/common';
import {tailwindClassCombine} from '../../utils/tailwind-class-combine';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.css'
})
export class Button {
  @Input() variant: ButtonVariantType = 'default';
  @Input() size: ButtonSizeType = 'default';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() routerLink?: string;
  @Output() click = new EventEmitter<MouseEvent>();

  protected get tailwindClassCombine(): string {
    return tailwindClassCombine(ButtonBase, ButtonVariants[this.variant], ButtonSizes[this.size], this.class)
  }

  protected handleClick(event: MouseEvent): void {
    if(!this.disabled) this.click.emit(event)
  }
}
