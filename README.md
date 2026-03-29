# 阿柠檬-fish-speech

必要环境 `nodejs` 、`redis` 、`chrome`

该扩展推荐使用`alemongo`或`alemondesk`作为生产环境

`alemongo` https://github.com/lemonade-lab/alemongo

`alemondesk` https://github.com/lemonade-lab/alemondesk

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

## 安装方式1: Git

### alemongo/alemondesk

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

### 本地

```sh
git clone -b release --depth=1 https://github.com/loneyclown/alemonjs-fishspeech.git ./packages/alemonjs-fishspeech
```

```sh
yarn install #开始模块化
```

- alemon.config.yaml

```yaml
apps:
  alemonjs-fishspeech: true # 启动扩展
```

## 安装方式2: npm

```sh
yarn add alemonjs-fishspeech -W
```

- alemon.config.yaml

```yaml
apps:
  alemonjs-fishspeech: true # 启动扩展
```

## 免责声明

- 勿用于以盈利为目的的场景

- 代码开放，无需征得特殊同意，可任意使用。能备注来源最好，但不强求

- 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除

## 引用

|                              Nickname                               | Contribution |
| :-----------------------------------------------------------------: | ------------ |
| [XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID) | API来源      |
