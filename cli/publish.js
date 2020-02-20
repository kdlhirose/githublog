import { resolve } from 'path';
import { publish } from './store/repo.js';

(async () => {
    await publish(
        `${resolve()}/public/`,
        'publish site',
    );
})();
