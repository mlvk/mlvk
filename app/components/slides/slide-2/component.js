import GenericSlide from 'mlvk/components/generic-slide/component';
import { TweenMax } from "gsap/TweenMax";
import { action } from '@ember-decorators/object';
import { attribute } from '@ember-decorators/component';
import { notEmpty } from '@ember-decorators/object/computed';

export default class SlidesSlide2Component extends GenericSlide {

  animateOnce() {
    TweenMax.to(this.buildSelector('.fade-slide-in'), 1, {
      startAt: {
        x:"50px",
        opacity:0
      },
      opacity:1,
      x: 0
    });
  }

  @notEmpty('text') hasText;

  isReady() {
    return this.get('imageReady');
  }

  @action
  imageReady() {
    this.set('imageReady', true);
    this.notifyReadyChanged();
  }
}
