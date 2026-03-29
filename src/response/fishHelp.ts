import { FISH_PREFIX } from '@src/constants/fishspeech';
import FishSpeechHelp from '@src/img/views/FishSpeechHelp';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum, next: () => void) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  if (!event.selects) {
    next();

    return;
  }

  const [message] = useMessage(event);

  const img = await renderComponentIsHtmlToBuffer(FishSpeechHelp, {
    prefix: FISH_PREFIX,
    isMaster: event.IsMaster
  });

  const format = Format.create();

  if (typeof img === 'boolean') {
    format.addText('帮助图片渲染失败，请稍后重试');
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
