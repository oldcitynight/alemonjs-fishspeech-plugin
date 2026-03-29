import { EventsEnum } from 'alemonjs';

export default (e: EventsEnum) => {
  console.log('[FishSpeech]', e.name);

  return true;
};
