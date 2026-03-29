import { getConfig } from '@src/components/config';
import { customAudio } from '@src/components/makeAudio';
import { TTSParams } from '@src/components/requestAPI';
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
  const msg = event.MessageText.replace(/^#?/, '')
    .replace(FISH_PREFIX, '')
    .replace(/^自定义合成/, '')
    .trim();

  const parts = msg.split(/\s+/);
  const overrides: Partial<TTSParams> = {};
  let text = '';

  for (const part of parts) {
    if (part.startsWith('采样参数')) {
      overrides.top_p = parseFloat(part.replace('采样参数', ''));
    } else if (part.startsWith('采样温度')) {
      overrides.temperature = parseFloat(part.replace('采样温度', ''));
    } else if (part.startsWith('情感')) {
      overrides.emotion = part.replace('情感', '');
    } else if (part.startsWith('文本')) {
      text = part.replace('文本', '');
    }
  }

  if (!text) {
    const format = Format.create();

    format.addText('请使用 "文本[内容]" 指定要合成的文字');
    void message.send({ format });

    return;
  }

  const format = Format.create();

  try {
    const audio = await customAudio(text, overrides, config);

    format.addAudio(`base64://${audio.toString('base64')}`);
    void message.send({ format });
  } catch (err) {
    format.addText(`合成失败：${err instanceof Error ? err.message : String(err)}`);
    void message.send({ format });
  }
};
