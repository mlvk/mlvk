import GenericSlide from 'mlvk/components/generic-slide/component';
import { TweenMax } from "gsap/TweenMax";
import { action } from '@ember-decorators/object';
import { attribute } from '@ember-decorators/component';
import { notEmpty } from '@ember-decorators/object/computed';

export default class SlidesImageTitleSlideComponent extends GenericSlide {

  animate() {
    TweenMax.to(this.buildSelector('.fade-in'), 1, {opacity:1});
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
