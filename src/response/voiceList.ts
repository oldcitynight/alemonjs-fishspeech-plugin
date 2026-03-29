import { getConfig, getVoiceList } from '@src/components/config';
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
  const list = await getVoiceList(config.generate.voice_path);

  const format = Format.create();

  if (list.length === 0) {
    format.addText('当前没有可用的音色');
  } else {
    format.addText('音色列表：\n' + list.join('\n'));
  }

  void message.send({ format });
};
