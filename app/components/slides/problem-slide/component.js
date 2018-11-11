import GenericSlide from 'mlvk/components/generic-slide/component';
import Typewriter from 'typewriter-effect/dist/core';

export default class SlidesProblemSlideComponent extends GenericSlide {

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
        src: ['https://mlvk-pitch-assets.s3.amazonaws.com/audio/risky-biz-long.mp3']
      });

      this.set('sound', sound);
    }

  _buildAnimation() {
    this.get('typewriter')
      .pauseFor(1000)
      .typeString('Those following a Vegan, Paleo, Keto lifestyle, want low net carbs')
      .pauseFor(1500)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString('Trouble is, people love their bread.')
      .pauseFor(1500)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString('How can we give them a satisfying meal and still deliver food that fits their lifestyle?')
      .pauseFor(1500)
      .deleteAll(1)
      .pauseFor(1000)
      .typeString('Keep going to see how.')
  }
}
