export const Configuration = 'configuration';
export const Category = {
    Article: 'カテゴリ: 記事',
}
export const Tag = {
    HansOn: 'タグ: ハンズオン',
}

export const Type = {
    Public: 'type:publish',
    Private: 'type:private',
};

export const Labels = [
    [Configuration, 'b43232'],
    [Category.Article, '64c840'],  [Tag.HansOn, 'fd9099'],
    [Type.Public, '0e4d3b'], [Type.Private, 'b43232'],
];

export const Pages  = {
    branch: 'gh-pages',
    ref: 'heads/gh-pages'
}

export const Master  = {
    branch: 'master',
    ref: 'heads/master'
}

const title = `Because it's there.`;
const body  = `
人々は、なぜ、山に登りたいのか？

そこに山があるから
`
export const Example = {
    title: title,
    body: body,
    labels: [
        Type.Public, Category.Article
    ]
}
