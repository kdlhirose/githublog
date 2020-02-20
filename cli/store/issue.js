import fs from 'fs';
import { EOL } from 'os';
import { client } from '../github/client.js';
import { github } from './config.js';
import { Type } from './constant.js';

export const loadIssueIntoMarkDown = async (dist) => {
    clearMarkdown(dist);
    let loader = issueLoader();
    while(true) {
        let issue = (await loader.next()).value;
        if (!issue) {
            break;
        }
        convertToMarkdown(issue, dist);
    }
}

export const clearMarkdown = (dist) => {
    fs.readdirSync(dist).forEach((file) => {
        fs.unlinkSync(`${dist}/${file}`);
    });
}

export const convertToMarkdown = async (issue, dist) => {
    const number        = issue.number;
    const title         = issue.title;
    let date            = (new Date(issue.created_at)).toLocaleDateString().replace(/[\/-]/g, '');
    const author        = issue.user.login;
    const tags          = [''];
    const categories    = [''];
    issue.labels.forEach(label => {
        const [type, value] = label.name.split(':');
        if (type === 'tags' || type === 'tag') {
            tags.push(` - ${value}`);
        } else if (type === 'categories' || type === 'category') {
            categories.push(` - ${value}`);
        }
    });

    const body          = issue.body;
    const content       = 
`---
title: ${title}
date: ${date}
tags:${tags.join(EOL)}
categories:${categories.join(EOL)}
author: ${author}
---

${body}`;
    const filename = `${number}_${date}.md`;
    fs.writeFileSync(`${dist}/${filename}`, content);
};

export const issueLoader = async function * () {
    const per_page = 100;
    let page = 0;
    while(true) {
        page++;
        const repoConfig = {
            owner: github.owner,
            repo: github.repository,
            labels: Type.Public,
            page,
            per_page,
        };
        const {data: issues} = await client.issues.listForRepo(repoConfig);
        if (issues.length === 0) {
            return;
        }
        for(const issue of issues) {
            yield issue;
        }
    }
};
