const [owner, repository] = process.env.GITHUB_REPOSITORY.split('/');

export const github = {
    owner,
    repository,
    endpoint: 'https://api.github.com',
    credentials: {
        accessToken: process.env.ACCESS_TOKEN,
    },
};

console.log('config:', github);

export default {
    github,
};
