import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed } from '@ember-decorators/object';

const BASE_URL = "https://content.jwplatform.com";

export default class MediaVideoPlayerComponent extends Component {

  @computed
  get guid() {
    return `video-container-${guidFor(this)}`;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.set('player', jwplayer(this.get('guid')));
  }

  didRender() {
    this.get('player').setup({
      image: `${BASE_URL}/thumbs/${this.get("image")}`,
      mediaid: this.get("mediaId"),
      file: `${BASE_URL}/videos/${this.get("file")}`
    });
  }
}
