import { getConfig } from '@src/components/config';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

export default (e: EventsEnum, next: () => void) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  if (!event.selects) {
    next();

    return;
  }

  if (!event.IsMaster) {
    next();

    return;
  }

  const config = getConfig();
  const [message] = useMessage(event);

  const format = Format.create();

  format.addText('当前配置：\n' + JSON.stringify(config, null, 2));
  void message.send({ format });
};
