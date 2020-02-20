import fs from 'fs';
import dotnet from 'dotenv';
import { client } from '../github/client.mjs';
import { github } from './config.mjs';
import { Labels, Configuration } from './constant.mjs';

export const populateConfig = async (replaces) => {
    const repoConfig = {
        owner: github.owner,
        repo: github.repository,
        labels: Configuration
    };
    const {data: issues} = await client.issues.listForRepo(repoConfig);
    const configIssue = issues.filter(issue => {
        return issue.title === Configuration
    }).pop();
    let config = dotnet.parse(configIssue.body);
    replaces.forEach(([tpl, dist]) => {
        let template = fs.readFileSync(tpl).toString();
        Object.keys(config).forEach(key => {
            const search = new RegExp(`%${key}%`, 'g');
            const replace = config[key];
            template = template.replace(search, replace);
        });
        fs.writeFileSync(dist, template);
    });
}