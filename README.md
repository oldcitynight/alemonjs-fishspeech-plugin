# 阿柠檬-fish-speech

文字转语音

## 配置说明

```yaml
# alemon.config.yaml
alemonjs-fishspeech:
  api:
    api_url: 'http://127.0.0.1:8080/'
    enable_mirror: false
  generate:
    default_voice_path: './datas/defaultVoice/voice.wav'
    default_voice_text: '说起来，深渊教团去奔狼领干嘛？'
    voice_path: './datas/customVoice/'
  common:
    name: 'FishSpeech'
```

### alemongo/alemondesk

`alemongo` https://github.com/lemonade-lab/alemongo

`alemondesk` https://github.com/lemonade-lab/alemondesk

- 地址

```sh
https://github.com/loneyclown/alemonjs-fishspeech.git
```

若访问受限，可使用如下加速地址

```sh
https://ghfast.top/https://github.com/loneyclown/alemonjs-fishspeech.git
```

- branch

```sh
release
```

- alemon.config.yaml

```yaml
apps:
  alemonjs-fishspeech: true # 启动扩展
```
