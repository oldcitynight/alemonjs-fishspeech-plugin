import { routeRules } from '@src/constants/fishspeech';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      {
        regular: routeRules.help,
        handler: lazy(() => import('@src/response/fishHelp'))
      },
      {
        regular: routeRules.simpleMake,
        handler: lazy(() => import('@src/response/simpleMake'))
      },
      {
        regular: routeRules.customVoice,
        handler: lazy(() => import('@src/response/customVoice'))
      },
      {
        regular: routeRules.makeVoice,
        handler: lazy(() => import('@src/response/makeVoice'))
      },
      {
        regular: routeRules.voiceList,
        handler: lazy(() => import('@src/response/voiceList'))
      },
      {
        regular: routeRules.testAPI,
        handler: lazy(() => import('@src/response/testAPI'))
      },
      {
        regular: routeRules.showConfig,
        handler: lazy(() => import('@src/response/showConfig'))
      }
    ]
  }
]);
