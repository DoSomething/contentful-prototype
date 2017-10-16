import { NEXT_SLIDE } from '../actions';

export function nextSlide(slideshowId) { // eslint-disable-line import/prefer-default-export
  return { type: NEXT_SLIDE, slideshowId };
}
