import Octokit from '@octokit/rest';
import { github } from '../store/config.mjs';
import recursive from 'recursive-readdir';
import fs from 'fs';

export const client = new Octokit({
    auth: `token ${github.credentials.accessToken}`,
});

export const commitAndPush = async (dir, config) => {
    const lastRef = await client.git.getRef(config);
    const trees = [];
    const files = await recursive(dir);
    files.forEach((file) => {
        const content = fs.readFileSync(file);
        trees.push({
            path: file.replace(`${dir}`, ''),
            content: content.toString(),
            mode: '100644',
            type: 'blob',
        });
    });
    const tree = await client.git.createTree({
        ...config,
        base_tree: lastRef.data.object.sha,
        tree: trees,
    });
    const lastCommit = await client.git.getCommit({
        ...config,
        commit_sha: lastRef.data.object.sha,
    });
    const commit = await client.git.createCommit({
        ...config,
        tree: tree.data.sha,
        parents: [
            lastCommit.data.sha,
        ],
    });

    await client.git.updateRef({
        ...config,
        sha: commit.data.sha,
        force: true,
    });
};
