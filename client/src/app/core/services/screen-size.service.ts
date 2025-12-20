import {inject, Injectable, Signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {MEDIA_BREAKPOINTS} from '../constants/media-breakpoints.const';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private breakpointObserver = inject(BreakpointObserver);

  isMobile: Signal<boolean> = toSignal(
    this.breakpointObserver.observe([`(max-width: ${MEDIA_BREAKPOINTS.DESKTOP}px )`])
      .pipe(
        map(result => result.matches)
      ),
    { initialValue: false }
  );
}
