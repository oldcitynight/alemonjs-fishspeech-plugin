import { getConfig } from '@src/components/config';
import { simpleAudio } from '@src/components/makeAudio';
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

  if (!event.IsMaster) {
    next();

    return;
  }

  const config = getConfig();
  const [message] = useMessage(event);
  const format = Format.create();

  try {
    const audio = await simpleAudio('你好呀，做一个测试', config);

    format.addAudio(`base64://${audio.toString('base64')}`);
    void message.send({ format });

    const tipFormat = Format.create();

    tipFormat.addText('API 测试完成，若语音已发送且可播放即正常');
    void message.send({ format: tipFormat });
  } catch (err) {
    format.addText(`API 测试失败：${err instanceof Error ? err.message : String(err)}`);
    void message.send({ format });
  }
};
