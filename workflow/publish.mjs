import { resolve } from 'path';
import { publish } from './store/repo.mjs';

(async () => {
    await publish(
        `${resolve()}/public/`,
        'publish site',
    );
})();
