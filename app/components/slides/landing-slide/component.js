import GenericSlide from '../../generic-slide/component';
import { action } from '@ember-decorators/object';
import { Howl } from 'howler';

export default class SlidesLandingSlideComponent extends GenericSlide {

  isReady() {
    return this.get('productImageReady') && this.get('logoReady');
  }

  setup(){
    this.sound = new Howl({
      src: ['https://mlvk-pitch-assets.s3.amazonaws.com/audio/force-audio.mp3']
    });
  }

  @action
  fakeSound() {
    this.get("slideMgr").moveToNextSlide();
    this.sound.play();
  }

  @action
  productImageReady() {
    this.set('productImageReady', true);
    this.notifyReadyChanged();
  }

  @action
  logoReady() {
    this.set('logoReady', true);
    this.notifyReadyChanged();
  }
}
