import { access, readFile, readdir } from 'fs/promises';
import path from 'path';
import { FishSpeechConfig } from './config';
import { Reference, TTSParams, createParams, requestForAudio } from './requestAPI';

/** 使用默认音色简单合成 */
export async function simpleAudio(text: string, config: FishSpeechConfig): Promise<Buffer> {
  const reference: Reference = {
    audio: await readFile(config.generate.default_voice_path),
    text: config.generate.default_voice_text
  };

  const params = createParams({
    text,
    references: [reference]
  });

  return requestForAudio(params, config);
}

/** 使用指定音色合成 */
export async function makeAudio(refId: string, text: string, config: FishSpeechConfig): Promise<Buffer> {
  const customVoicePath = path.join(config.generate.voice_path, refId);

  const files = await readdir(customVoicePath);
  const references: Reference[] = [];

  for (const f of files) {
    if (!f.endsWith('.wav')) {
      continue;
    }
    const txtPath = path.join(customVoicePath, f.replace('.wav', '.txt'));

    try {
      await access(txtPath);
      references.push({
        audio: await readFile(path.join(customVoicePath, f)),
        text: await readFile(txtPath, 'utf8')
      });
    } catch {
      // 没有对应的 txt 文件，跳过
    }
  }

  if (references.length === 0) {
    throw new Error(`未找到音色 "${refId}" 的参考音频`);
  }

  const params = createParams({ text, references });

  return requestForAudio(params, config);
}

/** 自定义参数合成 */
export function customAudio(text: string, overrides: Partial<TTSParams>, config: FishSpeechConfig): Promise<Buffer> {
  const params = createParams({ ...overrides, text });

  return requestForAudio(params, config);
}
