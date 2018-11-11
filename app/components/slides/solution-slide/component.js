import GenericSlide from 'mlvk/components/generic-slide/component';
import Typewriter from 'typewriter-effect/dist/core';
import { Howl } from 'howler';

export default class SlidesSolutionSlideComponent extends GenericSlide {

  queued = false;

  animate() {
    this.get('typewriter').start();

    if(!this.get('playedAudio')) {
      this.get('sound').play();
    }
  }

  pause() {
    this.get('typewriter').stop();
    this.get('sound').pause();
  }

  setup() {
    this._setupTypewriter();
    this._setupAudio();
  }

  addListeners() {
    this.get('sound').on('end', function(){
      this.set('playedAudio', true);
    }.bind(this));
  }

  _setupTypewriter() {
    const container = this.element.querySelector('.typewriter-container');
    const typewriter = new Typewriter(container, {
      delay: 40
    });
    this.set('typewriter', typewriter);
    this._buildAnimation();
  }

  _setupAudio() {
    const sound = new Howl({
      src: ['https://mlvk-pitch-assets.s3.amazonaws.com/audio/know-this-25-seconds.mp3']
    });

    this.set('sound', sound);
  }

  _buildAnimation() {
    this.get('typewriter')
      .pauseFor(1000)
      .typeString('The best of raw veggie bread')
      .pauseFor(1000)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString("Lined with a hearty collard leaf, and stuffed with sauerkraut, spices, nuts and seeds")
      .pauseFor(1500)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString("The best of wraps meets the powerhouse of superfoods. Gut health + full spectrum nutrition + damn good")
      .pauseFor(2000)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString("It's the perfect wrap.")
  }
}
