import Component from '@ember/component';
import Scrollama from 'scrollama';
import { computed } from '@ember-decorators/object';
import { notEmpty } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';


export default class SlideContainer extends Component {
  @service scroller;

  slides = [];
  registerMe = this.registerFunc.bind(this);

  getSlideOffset(num = 1) {
    const slides = this.get("slides");
    const currentSlide = this.get("currentSlide");

    if(currentSlide) {
      const currentIndex = slides.indexOf(currentSlide);
      const nextSlide = slides[currentIndex + num];

      if(nextSlide != undefined) {
        return nextSlide
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }

  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    const scrollMgr = Scrollama();
    this.set('scrollMgr', scrollMgr);

    this.setupScroller();
  }

  setupScroller() {
    const slides = this.get('slides');
    const scrollMgr = this.get('scrollMgr');

    scrollMgr
      .setup({
        step: '.slide',
        progress: true
			})

      .onStepEnter(data => {
        const slide = slides.find(s => s.element === data.element);

        this.activateSlide(slide);
        this.prepareSurroundingSlide(slide);
      })

      .onStepExit(data => {
        const slide = slides.find(s => s.element === data.element);
        this.deactiveSlide(slide);

      })

			.onStepProgress(data => {
        const slide = slides.find(s => s.element === data.element);
        if(slide) {
          slide.progress(data.progress);
        }
      });

		window.addEventListener('resize', scrollMgr.resize());
  }

  activateSlide(slide) {
    if(slide) {
      slide.setActive();
    }

    this.set("currentSlide", slide);
  }

  deactiveSlide(slide) {
    if(slide) {
      slide.setInactive();
    }

    if(this.get("slide") == slide) {
      this.set("slide", undefined);
    }
  }

  prepareSurroundingSlide(slide) {
    const slides = this.get("slides");
    const currentIndex = slides.indexOf(slide);
    const previousSlide = slides[currentIndex - 1];
    const nextSlide = slides[currentIndex + 1];

    if(previousSlide !== undefined){
      previousSlide.prepare();
    }

    if(nextSlide !== undefined){
      nextSlide.prepare();
    }
  }

  scrollToSlide(slide) {
    if(slide) {
      this.get("scroller").scrollToElement(slide.element);
    }
  }

  moveToPreviousSlide() {
    this.scrollToSlide(this.getSlideOffset(-1));
  }

  moveToNextSlide() {
    this.scrollToSlide(this.getSlideOffset());
  }

  registerFunc(slide) {
    this.get('slides').push(slide);
  }
}
