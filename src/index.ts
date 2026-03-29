import { getConfig } from './components/config';
import router from './response/router';

export default defineChildren({
  register() {
    return {
      responseRouter: router
    };
  },
  onCreated() {
    const config = getConfig();

    logger.info(`FishSpeech API ${config.api.api_url}`);
  }
});
