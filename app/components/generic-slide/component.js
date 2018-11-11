import Component from '@ember/component';
import { className } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { guidFor } from '@ember/object/internals';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class GenericSlideComponent extends Component{
  @className slide = 'slide';

  @className
  @computed
  get animationId() {
    return guidFor(this);
  }

  setup(){
    // Override
  }

  teardown() {
    // Override
  }

  addListeners() {
    // Override
  }

  removeListeners() {
    // Override
  }

  isReady() {
    // Override with custom readiness logic
    return true;
  }

  notifyReadyChanged() {
    this._processReadinessChanged();
  }

  animate() {
    //Override
  }

  pause() {
    //Override
  }

  nestSlide() {
    this.get('slideMgr').moveToNextSlide();
  }

  @restartableTask({maxConcurrency: 1})
  _animate = function * () {
    yield timeout(100);
    this.animate();
  }

  _pause() {
    this._animate.cancelAll();
    this.pause();
  }

  buildSelector(partial) {
    return `.${this.get('animationId')} ${partial}`;
  }

  setActive() {
    this._setActive.perform();
  }

  @restartableTask({maxConcurrency: 1})
  _setActive = function * () {
    yield timeout(350);

    this.prepare();

    this.set('active', true);

    this._processReadinessChanged();
  }

  _processReadinessChanged() {
    if(this.isReady() && this.get('active')) {
      this._animate.perform();
    }
  }

  setInactive() {
    this._setActive.cancelAll();
    this.set('active', false);
    this._pause();
  }

  prepare() {
    console.log("Prepare Slide");
    if(!this.get('shouldPrepare')) {
      this.set('shouldPrepare', true);
    }
  }

  progress(percentage) {
    this.set('percentage', percentage);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.get('registerFunc') === undefined) {
      throw new Error('I need a register function');
    }

    this.get('registerFunc')(this);

    this.setup();
    this.addListeners();
  }

  willDestroyElement() {
    this._super(...arguments);

    this.teardown();
    this.removeListeners();
  }
}
