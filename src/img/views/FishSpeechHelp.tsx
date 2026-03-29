import React from 'react';
import HTML from './HTML';

interface HelpItem {
  cmd: string;
  desc: string;
}

interface Props {
  prefix?: string;
  isMaster?: boolean;
}

export default function FishSpeechHelp({ prefix = 'FishSpeech', isMaster = false }: Props) {
  const commands: HelpItem[] = [
    { cmd: `${prefix}合成[文字]`, desc: '合成文字为语音' },
    { cmd: `${prefix}[名字]说[文字]`, desc: '以指定音色合成语音' },
    { cmd: `${prefix}自定义合成 ...`, desc: '自定义参数合成' },
    { cmd: `${prefix}音色列表`, desc: '获取支持的音色列表' },
    { cmd: `${prefix}帮助`, desc: '获取帮助' }
  ];

  const masterCommands: HelpItem[] = [
    { cmd: `${prefix}测试API`, desc: '测试语音合成 API' },
    { cmd: `${prefix}查看配置`, desc: '查看当前配置' }
  ];

  return (
    <HTML style={{ maxWidth: '480px' }}>
      <div style={{ padding: '24px' }}>
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3a8ee6, #5b6abf)',
            borderRadius: '12px 12px 0 0',
            padding: '20px 24px',
            color: '#fff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}
            >
              🐟
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Fish Speech</h2>
              <p style={{ margin: '2px 0 0', fontSize: '12px', opacity: 0.8 }}>语音合成插件帮助</p>
            </div>
          </div>
        </div>

        {/* 指令列表 */}
        <div
          style={{
            background: '#fff',
            padding: '16px 20px'
          }}
        >
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px', fontWeight: 600 }}>基础指令</div>
          {commands.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
                marginBottom: '6px',
                borderRadius: '8px',
                background: i % 2 === 0 ? '#f7f8fa' : '#fff'
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  background: '#3a8ee6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontFamily: 'tttgbnumber',
                  marginRight: '12px',
                  flexShrink: 0
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>{item.cmd}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Master 指令 */}
        {isMaster && (
          <div
            style={{
              background: '#fff',
              padding: '4px 20px 16px'
            }}
          >
            <div style={{ fontSize: '13px', color: '#e67e22', marginBottom: '12px', fontWeight: 600 }}>管理指令（仅主人）</div>
            {masterCommands.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  marginBottom: '6px',
                  borderRadius: '8px',
                  background: '#fffaf0'
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    background: '#e67e22',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontFamily: 'tttgbnumber',
                    marginRight: '12px',
                    flexShrink: 0
                  }}
                >
                  {commands.length + i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>{item.cmd}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #5b6abf, #3a8ee6)',
            borderRadius: '0 0 12px 12px',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          <span>Powered by AlemonJS + Fish Speech</span>
          <span>发送 #{prefix}帮助 查看本页</span>
        </div>
      </div>
    </HTML>
  );
}
