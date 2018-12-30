import config from 'mlvk/config/environment';

export function initialize() {
  try {
    jwplayer.key = config.jwplayer.key;
  } catch (e){
    // continue regardless of error
  }
}

export default {
  initialize
};
