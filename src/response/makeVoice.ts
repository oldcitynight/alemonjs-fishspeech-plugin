import { getConfig } from '@src/components/config';
import { makeAudio } from '@src/components/makeAudio';
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
  const match = msg.match(/^(.+)说(.+)$/);

  if (!match) {
    next();

    return;
  }

  const refId = match[1].trim();
  const text = match[2].trim();

  const format = Format.create();

  try {
    const audio = await makeAudio(refId, text, config);

    format.addAudio(`base64://${audio.toString('base64')}`);
    void message.send({ format });
  } catch (err) {
    format.addText(`合成失败：${err instanceof Error ? err.message : String(err)}`);
    void message.send({ format });
  }
};
