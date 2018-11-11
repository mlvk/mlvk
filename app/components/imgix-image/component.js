import Component from '@ember/component';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import {computed} from '@ember/object';

export default Component.extend(ResizeAware, {

  classNames: ['w-full', 'h-full'],

  shouldPrepare:false,

  width: 100,
  height: 100,
  fpX: 0.5,
  fpY: 0.5,
  fpZ: 1,
  fpDebug: false,
  quality: 1,
  fit: 'crop',
  crop: 'focalpoint',
  attrs: '',

  url: computed(
    'image',
    'width',
    'height',
    'fpX',
    'fpY',
    'fpZ',
    'fpDebug',
    'fit',
    'crop',
    'quality',
    'props',
    function(){
      const base = "https://mlvk.imgix.net/";
      const image = this.get('image');
      const width = this.get('width');
      const height = this.get('height');
      const fpX = this.get('fpX');
      const fpY = this.get('fpY');
      const fpZ = this.get('fpZ');
      const fpDebug = this.get('fpDebug');
      const quality = this.get('quality');
      const fit = this.get('fit');
      const crop = this.get('crop');
      const props = this.get('props');

      let str = `${base}${image}?w=${width}&h=${height}&fp-x=${fpX}&fp-y=${fpY}&fp-z=${fpZ}&fp-debug=${fpDebug}&fit=${fit}&crop=${crop}&q=${quality}&auto=format&${props}`;

      return str;
  }),

  debouncedDidResize(width, height) {
    this.set('height', height);
    this.set('width', width);
  },

  didInsertElement() {
    this._super(...arguments);

    this._handleResizeEvent();
    this._handleDebouncedResizeEvent();
  },

  didReceiveAttrs() {
    if(this.get('shouldPrepare')){
      this.set('load', true);
    }
  },

  actions: {
    onLoadHandler() {
      if(this.get('loadHandler') !== undefined) {
        this.get('loadHandler')();
      }
    }
  }
})
