import GenericSlide from 'mlvk/components/generic-slide/component';
import { TweenMax } from "gsap/TweenMax";

export default class SlidesIntroSlideComponent extends GenericSlide {
  hideHeader() {
    TweenMax.to(this.buildSelector('.header'), 1, {opacity:0});
  }

  showHeader() {
    TweenMax.to(this.buildSelector('.header'), .5, {opacity:1});
  }

  pause() {
    this.get('player').stop();
  }

  setup() {
    this._initPlayer();
    this._setupPlayer();
  }

  addListeners() {
    this.get('player').on('play', this.hideHeader.bind(this));
    this.get('player').on('pause', this.showHeader.bind(this));
    this.get('player').on('complete', this.showHeader.bind(this));
  }

  removeListeners() {
    this.get('player').remove();
  }

  _initPlayer() {
    const player = new jwplayer('player');
    this.set('player', player);
  }

  _setupPlayer() {
    this.get('player').setup({
      image: "https://content.jwplatform.com/thumbs/95HvdlvK-1920.jpg",
      mediaid: "95HvdlvK",
      file: "https://content.jwplatform.com/videos/95HvdlvK-thOJELFu.mp4"
    });
  }
}
