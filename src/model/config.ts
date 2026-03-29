import { getConfigValue } from 'alemonjs';

/**
 * 读取插件配置里的值
 * @returns
 */
export const getAppConfigValue = () => {
  const values = getConfigValue() || {};
  const name = 'alemonjs-fishspeech';

  return values[name] ?? {};
};
