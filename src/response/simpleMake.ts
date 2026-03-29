import { getConfig } from '@src/components/config';
import { simpleAudio } from '@src/components/makeAudio';
import { FISH_PREFIX } from '@src/constants/fishspeech';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

export default async (e: EventsEnum, next: () => void) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  if (!event.selects) {
    next();

    return;
  }

  const config = getConfig();
  const [message] = useMessage(event);
  const msg = event.MessageText.replace(/^#?/, '').replace(FISH_PREFIX, '');
  const text = msg.replace(/^合成/, '').trim();

  if (!text) {
    const format = Format.create();

    format.addText('请输入要合成的文字');
    void message.send({ format });

    return;
  }

  const format = Format.create();

  try {
    const audio = await simpleAudio(text, config);

    format.addAudio(`base64://${audio.toString('base64')}`);
    void message.send({ format });
  } catch (err) {
    format.addText(`合成失败：${err instanceof Error ? err.message : String(err)}`);
    void message.send({ format });
  }
};
