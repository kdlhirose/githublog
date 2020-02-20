import { pushCommit } from '../github/client.js';
import { github } from './config.js';
import { fetchIssues } from './index.js';
import { Configuration, Master } from './constant.js';
import fs from 'fs';

const dir = fs.realpathSync(`${__dirname}/../../dist`);

(async () => {
    const [configuration] = await fetchIssues({
        labels: [
            Configuration,
        ],
    });
    try {
        const blogConfig = yaml.safeLoad(configuration.body);
        const repository = blogConfig.repository || github.repository ;
        const ref = blogConfig.ref || Master;

        const config = {
            ...github,
            repository,
            ref,
        };
        await pushCommit(dir, config);
    } catch (e) {
        console.log(e);
    }
})();
