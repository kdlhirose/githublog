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

### 事前準備

* githubの無料アカウントでログインする

* githubのapi用accessTokenを取得する

    githubの右上の個人アイコンをクリックして、メニューから **Settings** を選択する  
    左のメニューから **Developer settings** を選択、さらに **Personal access tokens** を選択する  
![img01](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_01.png)

    Personal access tokensの画面から、Generate new tokenをクリックして作成画面に移動する。  
    Noteに、ご自身が認識しやすいようにメモーを入れましょう  
    Select scopesの部分は、  
    ``` 
    repo          Full control of private repositories  
    ```
    のみを選択してください。  
    accessTokenを作ったらメモーしておきましょう  
![img02](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_02.png)

### GithuBlogをフォーク
以降、forkしたリポジトリにて操作する

### accessTokenを設定する
リポジトリの **Settings** に移動し、Secretsにて```ACCESS_TOKEN```を追加する
![img03](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_03.png)

### github actionsを有効化する
リポジトリの **Actions** に移動し、workflowを有効にします。
![img04](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_04.png)

### 最後の一押し
リポジトリの **Code** に移動し、remove_thisファイルを削除する
![img05](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_05.png)
![img06](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_06.png)


**Actions**に移動し、workflowの実行を眺めましょう  
workflowの実行が完了次第、**Settings** に移動し、**Github Pages**を確認する
![img07](https://raw.githubusercontent.com/kobedigitallabo/githublog/master/documents/img_07.png)

## 設定を変更してみる