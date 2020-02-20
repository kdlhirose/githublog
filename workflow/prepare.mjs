import { resolve } from 'path';
import { ensureRepositoryIsReady } from './store/repo.mjs';
import { loadIssueIntoMarkDown } from './store/issue.mjs';
import { populateConfig } from './store/vuepress.mjs';

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
