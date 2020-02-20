import { resolve } from 'path';
import { ensureRepositoryIsReady } from './store/repo.js';
import { loadIssueIntoMarkDown } from './store/issue.js';

(async () => {
    // await ensureRepositoryIsReady();
    await loadIssueIntoMarkDown(
        `${resolve()}/docs/views/article`,
    );
})();
