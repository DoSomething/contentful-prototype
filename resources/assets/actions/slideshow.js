/* eslint-disable import/prefer-default-export */

import { NEXT_SLIDE } from '.';

export function nextSlide(slideshowId) {
  return { type: NEXT_SLIDE, slideshowId };
}
