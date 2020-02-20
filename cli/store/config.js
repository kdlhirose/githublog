const [owner, repository] = process.env.GITHUB_REPOSITORY.split('/');

export const github = {
    owner,
    repository,
    endpoint: 'https://api.github.com',
    publish: process.env.PUBLISH_REPOSITORY,
    credentials: {
        accessToken: process.env.ACCESS_TOKEN,
    },
};

console.log('config:', github);

export default {
    github,
};
