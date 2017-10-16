import { NEXT_SLIDE } from '../actions';

export function nextSlide(slideshowId) {
  return { type: NEXT_SLIDE, slideshowId };
}
