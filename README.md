# GithuBlog

## GithuBlogとは
ほぼ、githubの機能のみでサイトを作るツールです。  
使用した機能一覧は下記となる。  
* github repository  
* github issues  
* github actions  
* github pages
* github api  
* vuejs/vuepress  
    * 静的コンテンツ生成用のみ、他の同等なツールに置き換えても可。

## 遊ぶ方法
### 事前準備

* githubの無料アカウントでログインする
* ブログ公開用リポジトリを作成

```
    リポジトリ作成(https://github.com/new)に移動する
    Repository nameは任意です。
    後ほど使用するのメモをしておきましょう。
    publicと設定をし、
    Initialize this repository with a READMEをチェックして
    Create repositoryをクリックしてリポジトリを作成
```

* githubのapi用accessTokenを取得する

```
    githubの右上の個人アイコンをクリックして、メニューからSettingを選択する
    左のメニューからDeveloper settingsを選択、さらにPersonal access tokensを選択する
    Personal access tokensの画面から、Generate new tokenをクリックして作成画面に移動する。
    Noteに、ご自身が認識しやすいようにメモーを入れましょう
    Select scopesの部分は、
    * repo          Full control of private repositories *
    のみを選択してください。
    accessTokenを作ったら同じくメモーしておきましょう
```

### GithuBlogをフォーク
以降、フォークしたリポジトリにて作業を行う。
### accessTokenの設定


### GithuBlogを複製して、プライベートなリポジトリを作成する。