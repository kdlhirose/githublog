import { resolve } from 'path';
import { ensureRepositoryIsReady } from './store/repo.js';
import { loadIssueIntoMarkDown } from './store/issue.js';
import { populateConfig } from './store/vuepress.js';

(async () => {
    await ensureRepositoryIsReady();
    await loadIssueIntoMarkDown(
        `${resolve()}/docs/views/article`,
    );
    await populateConfig([
        [`${resolve()}/docs/.vuepress/config.tpl`, `${resolve()}/docs/.vuepress/config.js`],
        [`${resolve()}/docs/README.tpl`, `${resolve()}/docs/README.md`]
    ]);
})();
