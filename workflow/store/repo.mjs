import { client, commitAndPush } from '../github/client.mjs';
import dotnet from 'dotenv';
import { EOL } from 'os';
import { github } from './config.mjs';
import { Labels, Configuration, Pages, Master, Example } from './constant.mjs';

github.repo = github.publish || github.repository;
github.page = github.publish ? Pages : Master;

export const ensureRepositoryIsReady = async () => {
    await ensureIssueEnabled();
    // ensure labels are ready
    await ensureLabels();
    // ensure configs
    await ensureConfiguration();
    // try to enable Pages if there is no publish repository
    if (!github.publish) {
        await tryEnsurePublishPage();
    }
    // try to make repository prinvate
    await tryEnsurePrivateRepository();
};

export const publish = async (src, message) => {

    await commitAndPush(src, {
        ...github,
        ref: github.page.ref,
        message
    });

    await tryEnsurePublishPage();
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
        authorAvatar: `authorAvatar=https://octodex.github.com/images/linktocat.jpg`,
        bgImage     : 'bgImage=https://via.placeholder.com/1300x450',
        base        : `base=${github.repo}`,
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
        // 設定がない場合は、サンプルの投稿記事も作成する
        await client.issues.create({
            owner: github.owner,
            repo: github.repository,
            title: Example.title,
            body: Example.body,
            labels: Example.labels,
        });
    }
}

const tryEnsurePublishPage = async () => {
    try {
        await client.repos.enablePagesSite({
            owner: github.owner,
            repo: github.repo,
            source: {
                branch: github.page.branch,
            }
        });
    } catch (e) {
        // skip this because we cannot handle github error;
        // private repository or there is no source. etc.
    }
}

const ensureIssueEnabled = async () => {
    await client.repos.update({
        owner: github.owner,
        repo: github.repository,
        has_issues: true
    });
}

const tryEnsurePrivateRepository = async () => {
    try {
        await client.repos.update({
            owner: github.owner,
            repo: github.repository,
            private: true,
            visibility: 'private'
        });    
    } catch (e) {
        // skip this because we cannot handle github error;
        // https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository
    }
}