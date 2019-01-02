import Component from '@ember/component';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { computed } from '@ember/object';

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
      const image = this.image;
      const width = this.width;
      const height = this.height;
      const fpX = this.fpX;
      const fpY = this.fpY;
      const fpZ = this.fpZ;
      const fpDebug = this.fpDebug;
      const quality = this.quality;
      const fit = this.fit;
      const crop = this.crop;
      const props = this.props;

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
    if(this.shouldPrepare){
      this.set('load', true);
    }
  },

  actions: {
    onLoadHandler() {
      if(this.loadHandler !== undefined) {
        this.loadHandler();
      }
    }
  }
})
