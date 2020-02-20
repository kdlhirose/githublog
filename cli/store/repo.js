import { client, commitAndPush } from '../github/client.js';
import dotnet from 'dotenv';
import { EOL } from 'os';
import { github } from './config.js';
import { Labels, Configuration, Pages } from './constant.js';

export const ensureRepositoryIsReady = async () => {
    await ensureIssueEnabled();
    await ensurePrivateRepository();
    // ensure labels are ready
    await ensureLabels();
    // ensure configs
    await ensureConfiguration();
};

export const publish = async (src, message) => {

    await commitAndPush(src, {
        ...github,
        repo: github.publish || github.repository,
        ref: Pages.ref,
        message
    });

    await ensurePublishPage();
}

const ensureLabels = async () => {
    let labelsForCreate = [];
    const {data: labelsInRepo} = await client.issues.listLabelsForRepo({
        owner: github.owner,
        repo: github.repository,
    });
    Labels.forEach((Label) => {
        const [name, defaultColor] = Label;
        for(let label of labelsInRepo) {
            if (label.name === name) {
                return;
            }
        }
        labelsForCreate.push(Label);
    });
    labelsForCreate.forEach(async ([name, color]) => {
        await client.issues.createLabel({
            owner: github.owner,
            repo: github.repository,
            name,
            color,
          });
    });
}

const ensureConfiguration = async () => {
    const repoConfig = {
        owner: github.owner,
        repo: github.repository,
        labels: Configuration
    };

    const {data: issues} = await client.issues.listForRepo(repoConfig);
    let config = {
        title       : `title=タイトル`,
        description : `description=ディスクリプション`,
        faceImage   : `faceImage=/head.jpg`,
        bgImage     : 'bgImage=/banner.jpg',
        base        : `base=${github.publish}`,
    };

    const configIssue = issues.filter(issue => {
        return issue.title === Configuration
    }).pop();

    if (configIssue) {
        const issueNumber = configIssue.issue_number || configIssue.number;
        let _config = dotnet.parse(configIssue.body);
        Object.keys(_config).forEach(key => {
            delete config[key];
        });
        if (Object.values(config).length) {
            await client.issues.update({
                owner: github.owner,
                repo: github.repository,
                issue_number: issueNumber,
                body: [
                    configIssue.body,
                    ...Object.values(config)
                ].join(EOL),
                labels: [
                    Configuration,
                ],
            });
        }
    } else {
        await client.issues.create({
            owner: github.owner,
            repo: github.repository,
            title: Configuration,
            body: Object.values(config).join(EOL),
            labels: [
                Configuration,
            ],
        });
    }
}

const ensurePublishPage = async () => {
    try {
        await client.repos.getPages({
            owner: github.owner,
            repo: github.publish,
        });
    } catch (e) {
        await client.repos.enablePagesSite({
            owner: github.owner,
            repo: github.publish,
            source: {
                branch: Pages.branch,
            }
        });
    }
}

const ensureIssueEnabled = async () => {
    await client.repos.update({
        owner: github.owner,
        repo: github.repository,
        has_issues: true
    });
}

const ensurePrivateRepository = async () => {
    await client.repos.update({
        owner: github.owner,
        repo: github.repository,
        private: true,
        visibility: 'private'
    });
}