import FishSpeechHelp from '@src/img/views/FishSpeechHelp';
import { defineConfig } from 'jsxp';
import React from 'react';

export default defineConfig({
  routes: {
    '/help': {
      component: <FishSpeechHelp prefix="FishSpeech" isMaster={true} />
    }
  }
});
