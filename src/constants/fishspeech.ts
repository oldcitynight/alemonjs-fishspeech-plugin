/** FishSpeech 插件指令前缀 */
export const FISH_PREFIX = 'FishSpeech';

/** 路由匹配规则 */
export const routeRules = {
  /** 帮助 */
  help: new RegExp(`^#?${FISH_PREFIX}(帮助|help|HELP|指南|说明)$`),
  /** 简单合成 */
  simpleMake: new RegExp(`^#?${FISH_PREFIX}合成(.+)$`),
  /** 指定音色合成 */
  makeVoice: new RegExp(`^#?${FISH_PREFIX}(.+)说(.+)$`),
  /** 自定义合成 */
  customVoice: new RegExp(`^#?${FISH_PREFIX}自定义合成(.+)$`),
  /** 音色列表 */
  voiceList: new RegExp(`^#?${FISH_PREFIX}音色列表$`),
  /** 测试 API */
  testAPI: new RegExp(`^#?${FISH_PREFIX}测试API$`),
  /** 查看配置 */
  showConfig: new RegExp(`^#?${FISH_PREFIX}查看配置$`)
} as const;
