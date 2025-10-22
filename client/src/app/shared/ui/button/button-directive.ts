import {Directive, HostBinding, Input} from '@angular/core';
import {ButtonBase, ButtonVariants, ButtonVariantType} from './consts/button-variant.type';
import {ButtonSizes, ButtonSizeType} from './consts/button-size.type';
import {tailwindClassCombine} from '../../utils/tailwind-class-combine';

@Directive({
  standalone: true,
  selector: '[appButton]'
})
export class ButtonDirective {

  @Input() variant: ButtonVariantType = 'default';
  @Input() size: ButtonSizeType = 'default';
  @Input() class: string = '';

  @HostBinding('class')
  get elementClass(): string {
    return tailwindClassCombine(
      ButtonBase,
      ButtonVariants[this.variant],
      ButtonSizes[this.size],
      this.class
    );
  }

}
