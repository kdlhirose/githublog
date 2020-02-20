import Octokit from '@octokit/rest';
import { github } from '../store/config.js';
import { Master } from '../store/constant.js';
import recursive from 'recursive-readdir';
import fs from 'fs';

export const client = new Octokit({
    auth: `token ${github.credentials.accessToken}`,
});

export const pushCommit = async (dir, config, message = 'commit from command') => {
    config = config || github;
    const ref = config && config.ref || Master;

    const lastRef = await client.git.getRef({
        owner: config.owner,
        repo: config.repository,
        ref,
    });
    const trees = [];
    const files = await recursive(dir);
    files.forEach((file) => {
        const content = fs.readFileSync(file);
        const arrayBuffer = Uint8Array.from(Buffer.from(content));
        trees.push({
            path: file.replace(`${dir}/`, ''),
            content: content.toString(),
            mode: '100644',
            type: 'blob',
        });
    });
    const tree = await client.git.createTree({
        owner: config.owner,
        repo: config.repository,
        base_tree: lastRef.data.object.sha,
        tree: trees,
    });
    const lastCommit = await client.git.getCommit({
        owner: config.owner,
        repo: config.repository,
        commit_sha: lastRef.data.object.sha,
    });
    const commit = await client.git.createCommit({
        owner: config.owner,
        repo: config.repository,
        message,
        tree: tree.data.sha,
        parents: [
            lastCommit.data.sha,
        ],
    });
    await client.git.updateRef({
        owner: config.owner,
        repo: config.repository,
        ref,
        sha: commit.data.sha,
        force: true,
    });
};
