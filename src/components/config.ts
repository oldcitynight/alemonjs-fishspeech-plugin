import { getAppConfigValue } from '@src/model/config';
import { access, readdir } from 'fs/promises';
import path from 'path';

/** 插件配置结构 */
export interface FishSpeechConfig {
  api: {
    enable_api: boolean;
    api_url: string;
    enable_mirror: boolean;
  };
  generate: {
    enable_gpu: boolean;
    default_voice_path: string;
    default_voice_text: string;
    voice_path: string;
  };
  common: {
    name: string;
  };
}

/** 默认配置 */
const defaultConfig: FishSpeechConfig = {
  api: {
    enable_api: true,
    api_url: 'http://127.0.0.1:8080/',
    enable_mirror: false
  },
  generate: {
    enable_gpu: false,
    default_voice_path: './datas/defaultVoice/voice.wav',
    default_voice_text: '说起来，深渊教团去奔狼领干嘛？难道又要重演特瓦林事件？啊——重复的灾难就别再来啦。',
    voice_path: './datas/customVoice/'
  },
  common: {
    name: 'FishSpeech'
  }
};

/** 从框架配置加载插件配置 */
export function loadConfig(): FishSpeechConfig {
  const values = getAppConfigValue();
  const config = structuredClone(defaultConfig);

  if (values.api) {
    config.api = { ...config.api, ...values.api };
  }
  if (values.generate) {
    config.generate = { ...config.generate, ...values.generate };
  }
  if (values.common) {
    config.common = { ...config.common, ...values.common };
  }

  return config;
}

/** 获取音色列表 */
export async function getVoiceList(voicePath: string): Promise<string[]> {
  const list: string[] = [];

  try {
    const files = await readdir(voicePath);

    for (const f of files) {
      if (!f.endsWith('.wav')) {
        continue;
      }
      const txtPath = path.join(voicePath, f.replace('.wav', '.txt'));

      try {
        await access(txtPath);
        list.push(f.replace('.wav', ''));
      } catch {
        // 没有对应 txt 文件，跳过
      }
    }
  } catch {
    // 目录不存在
  }

  return list;
}

/** 全局配置实例 */
let _config: FishSpeechConfig | null = null;

export function getConfig(): FishSpeechConfig {
  _config ??= loadConfig();

  return _config;
}
