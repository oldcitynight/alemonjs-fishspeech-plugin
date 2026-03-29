import { encode } from '@msgpack/msgpack';
import { FishSpeechConfig } from './config';

/** 参考音频 */
export interface Reference {
  audio: Buffer;
  text: string;
}

/** TTS 请求参数 */
export interface TTSParams {
  text: string;
  references?: Reference[];
  reference_id?: string;
  normalize: boolean;
  format: 'wav' | 'mp3' | 'flac';
  mp3_bitrate: number;
  opus_bitrate: number;
  max_new_tokens: number;
  chunk_length: number;
  top_p: number;
  repetition_penalty: number;
  temperature: number;
  speaker?: string;
  emotion?: string;
  streaming: boolean;
}

/** 创建默认参数 */
export function createParams(overrides: Partial<TTSParams> = {}): TTSParams {
  return {
    text: '',
    references: undefined,
    reference_id: undefined,
    normalize: true,
    format: 'wav',
    mp3_bitrate: 64,
    opus_bitrate: -1000,
    max_new_tokens: 1024,
    chunk_length: 100,
    top_p: 0.7,
    repetition_penalty: 1.2,
    temperature: 0.7,
    speaker: undefined,
    emotion: undefined,
    streaming: false,
    ...overrides
  };
}

/** 请求 Fish-Speech API 合成音频 */
export async function requestForAudio(params: TTSParams, config: FishSpeechConfig): Promise<Buffer> {
  let url = config.api.api_url;

  url += url.endsWith('/') ? 'v1/tts' : '/v1/tts';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/msgpack'
    },
    body: encode(params)
  });

  if (!res.ok) {
    throw new Error(`请求失败，错误信息：${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();

  return Buffer.from(arrayBuffer);
}
