# Git

## 1.集中式和分布式版本控制系统有什么区别呢？

**集中式版本控制系统**的代表是CVS和SVN，**分布式版本控制系统**的代表是Git。

先说集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。

集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

![img](https://note.youdao.com/src/B1D5EAC2CE2B47C4A5C96663B0104D24)

那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。

![img](https:////note.youdao.com/src/27A4DAD193EF49CC8734FDBCBB166005)

## 2.安装git，并配置

```js
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```



因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

> 注意：`git config`命令的`--global`参数，用了这个参数，表示你这台机器上**所有的Git仓库都会使用这个配置**，当然也可以对某个仓库指定不同的用户名和Email地址。

## 3.创建版本库

什么是版本库呢？版本库又名仓库，英文名**repository**，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

- **第一步**，创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录：

```js
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
```

> pwd命令用于显示当前目录。在我的Mac上，这个仓库位于/Users/michael/learngit。
>
> 如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。

- **第二步**，通过`git init`命令把这个目录变成Git可以管理的仓库：

```js
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
```



瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

- **第三步**，现在我们编写一个`readme.txt`文件，内容如下：

```js
Git is a version control system.
Git is free software.
```



一定要放到learngit目录下（子目录也行），因为这是一个Git仓库，放到其他地方Git再厉害也找不到这个文件。

和把大象放到冰箱需要3步相比，把一个文件放到Git仓库只需要两步。

1. 用命令git add告诉Git，把文件添加到仓库：

```js
$ git add readme.txt
```

执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。

2. 用命令`git commit`告诉Git，把文件提交到仓库：

```js
$ git commit -m "wrote a readme file"
[master (root-commit) eaadf4e] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```

简单解释一下`git commit`命令，-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

嫌麻烦不想输入-m "xxx"行不行？确实有办法可以这么干，但是强烈不建议你这么干，因为输入说明对自己对别人阅读都很重要。实在不想输入说明的童鞋请自行Google，我不告诉你这个参数。

`git commit`命令执行成功后会告诉你，1 file changed：1个文件被改动（我们新添加的readme.txt文件）；2 insertions：插入了两行内容（readme.txt有两行内容）。

## 4.git一些命令

- `git status`：可以让我们时刻掌握仓库当前的状态。

- `git diff`：顾名思义就是查看difference，可以查看修改内容。

- `git add`：告诉Git，把文件添加到仓库。

- `git commit`：告诉Git，把文件提交到仓库。

- `git log`：查看历史记录，显示从最近到最远的提交日志。

- `git log --pretty=oneline`：git log输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数

![img](https:////note.youdao.com/src/D1B036CA80184C8880FE49A55F8E45F9)

> **注意：**在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

- `git reset --hard HEAD^`：回退道上一版本。

- `git reset --hard 1094a`：指定回到未来的某个版本（版本号没必要写全，前几位就可以了，Git会自动去找）

- `git reflog`：用来记录你的每一次命令

## 5.工作区和暂存区

**工作区：**就是你在电脑里能看到的目录，比如我的learngit文件夹就是一个工作区：

**版本库：**工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为`stage`（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

![img](https:////note.youdao.com/src/37A5F891DB7C46D9B89C20F3FE0F92DA)

前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

- 第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

- 第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以现在，git commit就是往master分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

## 6.撤销修改

`git checkout -- readme.txt`丢弃工作区的修改

把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

`git reset HEAD <file>`

可以把暂存区的修改撤销掉（unstage），重新放回工作区，git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。

>  小结：
>
> 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
>
> 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

## 7.删除文件

1. 想要删除一个文件，一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：

`rm test.txt`

2. 这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了：

```js
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

3. 现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：

`git rm test.txt`

`git commit`

4. 另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

`git checkout -- test.txt`

`git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

## 8.远程仓库

**GitHub**这个网站就是提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。

由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：

- **第1步：**检查ssh是否安装
  - 首先安装打开终端：`$ ssh -v`
  - 查看ssh版本

  ```js
  usage: ssh [-1246AaCfgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
             [-D [bind_address:]port] [-e escape_char] [-F configfile]
             [-I pkcs11] [-i identity_file]
             [-L [bind_address:]port:host:hostport]
             [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
             [-R [bind_address:]port:host:hostport] [-S ctl_path]
             [-W host:port] [-w local_tun[:remote_tun]]
             [user@]hostname [command]
  ```

  这个表明ssh已经安装.如果没有安装，则走第二步

- **第2步：**创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

  `$ ssh-keygen -t rsa -C "youremail@example.com"`

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

若一路回车（密码可以不写），这样只会在`~/.ssh/` 目录下生成 `id_rsa` 和` id_rsa.pub` 两个文件。为了区分，我们在第一个回车后设置路径：

```js
Enter file in which to save the key (/root/.ssh/id_rsa):~/.ssh/文件名 
```

由此我们分别为gerrit和github生成对应的公钥和私钥，完成后的目录：

```js
id_rsa_gerrit id_rsa_gerrit.pub id_rsa_github id_rsa_github.pub
```

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是`SSH Key`的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

- **第3步：`**$ ls -a ~/.ssh`  通过搜索目录

`id_rsa id_rsa.pub`

打开 `id_rsa.pub`文件 里面就有需要的ssh key。

在终端输入命令打开id_rsa.pub

```js
vim ~/.ssh/id_rsa.pub
```

将.pub中的多有内容拷贝出来填到git账户里面就ok了

拷贝公钥内容：**pbcopy < ~/.ssh/id_rsa.pub**

- **第4步：**登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

![img](https:////note.youdao.com/src/38833F69144C4897B8D8DA6EDF8A93A5)

点“Add Key”，你就应该看到已经添加的Key：

![img](https://note.youdao.com/src/FBDB05E10012408AA5C51A3870467D8F)

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

> **注意：**
>
> 1、一把公钥只能被一个GITHUB帐号拥有->因此必须为不同的帐号创建公钥。
>
> 2、交互时需要本地私钥与GITHUB帐号的公钥配对。
>
> 因此，要在同一台电脑上给两个属于不同帐号的仓库提交时，必须在本地创建两对公/私钥匙，分别把两把公钥给两个帐号，提交时根据要提交的仓库所属帐号选择相应的本地私钥即可；
>
> 当我们要在一个仓库上PUSH提交的内容时，使用以上的步骤可以选择对应的公钥，GITHUB服务器收到提交的内容时，先解析出仓库地址，然后从该仓库的所属帐号中找到一把能解锁该提交的公钥。

## 9.添加远程仓库

你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。

首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库：

![img](https://note.youdao.com/src/C05101FDF89F4E67A3AFCE5122D6EF73)

在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![img](https:////note.youdao.com/src/7E9C790BAA6F48438C27D6216F084345)

目前，在GitHub上的这个learngit仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

现在，我们根据GitHub的提示，在本地的learngit仓库下运行命令：

```js
$ git remote add origin git@github.com:michaelliao/learngit.gitshuo
```

添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

下一步，就可以把本地库的所有内容推送到远程库上：

git push:实际上是把当前分支master推送到远程。

![img](https:////note.youdao.com/src/E86F87CEBF824CBDAF0C4D45DA9F434D)

`git push -u origin master`:由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；

> **注意：**
>
> SSH警告
>
> 当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：
>
> The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established. RSA key fingerprint is xx.xx.xx.xx.xx. Are you sure you want to continue connecting (yes/no)?
>
> 这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
>
> Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：
>
> Warning: Permanently added 'github.com' (RSA) to the **list** of known hosts.
>
> 这个警告只会出现一次，后面的操作就不会有任何警告了。
>
> 如果你实在担心有人冒充GitHub服务器，输入yes前可以对照[GitHub的RSA Key的指纹信息](https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/)是否与SSH连接给出的一致。

## 10.从远程仓库克隆

本地没有仓库的情况下，最好的方式是先创建远程库，然后，从远程库克隆。

首先，登陆GitHub，创建一个新的仓库，名字叫gitskills：

![img](https:////note.youdao.com/src/B56E1495F522424FA8C5E262EE2A3820)

我们勾选`Initialize this repository with a README`，这样GitHub会自动为我们创建一个`README.md`文件。创建完毕后，可以看到`README.md`文件：

![img](https://note.youdao.com/src/9F93C6A2BBC243B6963C6907C10B71F0)

现在，远程库已经准备好了，下一步是用命令git clone克隆一个本地库：

```js
$ git clone git@github.com:michaelliao/gitskills.git
Cloning into 'gitskills'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 3
Receiving objects: 100% (3/3), done.
```

注意把Git库的地址换成你自己的，然后进入gitskills目录看看，已经有README.md文件了：

```js
$ cd gitskills
$ ls
README.md
```

你也许还注意到，GitHub给出的地址不止一个，还可以用https://github.com/michaelliao/gitskills.git这样的地址。实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。

使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。

**11、分支管理**

**1）创建与合并分支**

首先，我们创建dev分支，然后切换到dev分支：

**$** **git checkout -b dev** Switched to a new branch 'dev'

git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：

$ git branch dev $ git checkout dev Switched to branch 'dev'

然后，用git branch命令查看当前分支：

$ git branch * dev  master

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

强力删除分支：git branch -D <name>强行删除。

**2)合并解决冲突**

现在，master分支和feature1分支各自都分别有新的提交，变成了这样：

![img](https:////note.youdao.com/src/265D233EF3C74DDA955BE8A8B7CF712D)

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：

$ git merge feature1 Auto-merging readme.txt CONFLICT (content): Merge conflict **in** readme.txt Automatic merge failed; fix conflicts **and** **then** commit the result.

果然冲突了！Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件：

我们可以直接查看readme.txt的内容：

Git is a distributed version control system. Git is free software distributed under the GPL. Git has a mutable index called stage. Git tracks changes of files. <<<<<<< HEAD Creating a new branch is quick & simple. ======= Creating a new branch is quick AND simple. >>>>>>> feature1

Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：

Creating a **new** branch is quick **and** simple.

再提交：

$ git add readme.txt  $ git commit -m "conflict fixed" [master cf810e4] conflict fixed

现在，master分支和feature1分支变成了下图所示：

![img](https:////note.youdao.com/src/601235EF59B749F8A88E4956BB2947D0)

用带参数的git log也可以看到分支的合并情况：

git log --graph：命令可以看到分支合并图

$ git log --graph --pretty=oneline --abbrev-commit *   cf810e4 (HEAD -> master) conflict fixed |\   | * 14096d0 (feature1) **AND** simple * | 5dc6824 & simple |/   * b17d20e branch test * d46f35e (origin/master) remove test.txt * b84166e add test.txt * 519219b git tracks changes * e43a48b understand how stage works * 1094adb append GPL * e475afc add distributed * eaadf4e wrote a readme file

最后，删除feature1分支：

$ git branch -d feature1 Deleted branch feature1 (was 14096d0).

**3）bug分支**

dev分支上的工作进行到一半，暂时无法提交，而此时你需要紧急处理一下bug，需要创建一直bug分支，那么此时需要将dev分支上的修改暂存起来：git stash

现在，用git status查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支：

$ git checkout master Switched to branch 'master' Your branch is ahead of 'origin/master' by 6 commits.  (use "git push" to publish your local commits) $ git checkout -b issue-101 Switched to a new branch 'issue-101'

现在修复bug，需要把“Git is free software ...”改为“Git is a free software ...”，然后提交：

$ git add readme.txt  $ git commit -m "fix bug 101" [issue-101 4c805e2] fix bug 101 1 file changed, 1 insertion(+), 1 deletion(-)

修复完成后，切换到master分支，并完成合并，最后删除issue-101分支：

$ git checkout master Switched to branch 'master' Your branch is ahead of 'origin/master' by 6 commits.  (use "git push" to publish your local commits) $ git merge --no-ff -m "merged bug fix 101" issue-101 Merge made by the 'recursive' strategy. readme.txt | 2 +- 1 file changed, 1 insertion(+), 1 deletion(-)

**注意：**合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

接着回到dev分支干活了！

$ git checkout dev Switched to branch 'dev' $ git status On branch dev nothing to commit, working tree clean

工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：

$ git stash list stash@{0}: WIP on dev: f52c633 add merge

工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；

另一种方式是用git stash pop，恢复的同时把stash内容也删了：

$ git stash pop On branch dev Changes to be committed:  (use "git reset HEAD <file>..." to unstage)     new file:   hello.py Changes not staged for commit:  (use "git add <file>..." to update what will be committed)  (use "git checkout -- <file>..." to discard changes in working directory)     modified:   readme.txt Dropped refs/stash@{0} (5d677e2ee266f39ea296182fb2354265b91b3b2a)

再用git stash list查看，就看不到任何stash内容了：

$ git stash list

你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：

$ git stash apply stash@{0}

**4）多人协作**

当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

要查看远程库的信息，用git remote：

$ git remote origin

或者，用git remote -v显示更详细的信息：

$ git remote -v origin  git@github.com:michaelliao/learngit.git (fetch) origin  git@github.com:michaelliao/learngit.git (push)

上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

$ git push origin master

如果要推送其他分支，比如dev，就改成：

$ git push origin dev

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

- master分支是主分支，因此要时刻与远程同步；
- dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

抓取分支

多人协作时，大家都会往master和dev分支上推送各自的修改。

现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆：

$ git clone git@github.com:michaelliao/learngit.git Cloning into 'learngit'... remote: Counting objects: 40, done. remote: Compressing objects: 100% (21/21), done. remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0 Receiving objects: 100% (40/40), done. Resolving deltas: 100% (14/14), done.

当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支。不信可以用git branch命令看看：

$ git branch * master

现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：

$ git checkout -b dev origin/dev

现在，他就可以在dev上继续修改，然后，时不时地把dev分支push到远程：

$ git add env.txt $ git **commit** -m "add env" [dev 7a5e5dd] **add** env 1 file changed, 1 insertion(+) **create** mode 100644 env.txt $ git push origin dev Counting objects: 3, done. Delta compression **using** up **to** 4 threads. Compressing objects: 100% (2/2), done. Writing objects: 100% (3/3), 308 bytes | 308.00 KiB/s, done. Total 3 (delta 0), reused 0 (delta 0) **To** github.com:michaelliao/learngit.git   f52c633..7a5e5dd  dev -> dev

你的小伙伴已经向origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：

$ cat env.txt env $ git add env.txt $ git **commit** -m "add new env" [dev 7bd91f1] **add** new env 1 file changed, 1 insertion(+) **create** mode 100644 env.txt $ git push origin dev **To** github.com:michaelliao/learngit.git ! [rejected]        dev -> dev (non-fast-forward) error: failed **to** push **some** refs **to** 'git@github.com:michaelliao/learngit.git' hint: Updates were rejected because the tip **of** your **current** branch **is** behind hint: its remote counterpart. Integrate the remote changes (e.g. hint: 'git pull ...') before pushing again. hint: See the 'Note about fast-forwards' **in** 'git push --help' **for** details.

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送：

$ git pull There is no tracking information **for** the current branch. Please specify which branch you want to merge **with**. See git-pull(1) **for** details.     git pull <remote> <branch> If you wish to set tracking information for this branch you can do so with:     git branch --set-upstream-to=origin/<branch> dev

git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接：

**$ git branch** **--set-upstream-to=origin/dev dev** Branch 'dev' **set** up **to** track remote branch 'dev' **from** 'origin'.

再pull：

$ git pull Auto-merging env.txt CONFLICT (add/add): Merge conflict **in** env.txt Automatic merge failed; fix conflicts **and** **then** commit the result.

这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的[解决冲突](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000)完全一样。解决后，提交，再push：

$ git **commit** -m "fix env conflict" [dev 57c53ab] fix env conflict $ git push origin dev Counting objects: 6, done. Delta compression **using** up **to** 4 threads. Compressing objects: 100% (4/4), done. Writing objects: 100% (6/6), 621 bytes | 621.00 KiB/s, done. Total 6 (delta 0), reused 0 (delta 0) **To** github.com:michaelliao/learngit.git   7a5e5dd..57c53ab  dev -> dev

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用git push origin <branch-name>推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！

如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

总结

- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

**5）rebase**

git rebase

- rebase操作可以把本地未push的分叉提交历史整理成直线；
- rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

每次合并再push后，分支变成了这样：

$ git log --graph --pretty=oneline --abbrev-commit * d1be385 (HEAD -> master, origin/master) init hello *   e5e69f1 Merge branch 'dev' |\   | *   57c53ab (origin/dev, dev) fix env conflict | |\   | | * 7a5e5dd add env | * | 7bd91f1 add **new** env | |/   * |   12a631b merged bug fix 101 |\ \   | * | 4c805e2 fix bug 101 |/ /   * |   e1e9c68 merge with no-ff |\ \   | |/   | * f52c633 add merge |/   *   cf810e4 conflict fixed

总之看上去很乱，有强迫症的童鞋会问：为什么Git的提交历史不能是一条干净的直线？

其实是可以做到的！

Git有一种称为rebase的操作，有人把它翻译成“变基”。

这个时候，rebase就派上了用场。我们输入命令git rebase试试：

$ git rebase First, rewinding head to replay your work on top of it... Applying: add comment Using index info to reconstruct a base tree... M    hello.py Falling back to patching base **and** 3-way merge... Auto-merging hello.py Applying: add author Using index info to reconstruct a base tree... M    hello.py Falling back to patching base **and** 3-way merge... Auto-merging hello.py

输出了一大堆操作，到底是啥效果？再用git log看看：

$ git log *--graph --pretty=oneline --abbrev-commit* * 7e61ed4 (HEAD -> master) add author * 3611cfe add comment * f005ed4 (origin/master) **set** exit=1 * d1be385 init hello ...

**12、使用github**

点“Fork”就在自己的账号下克隆了一个bootstrap仓库，然后，从自己的账号下clone：

git clone git@github.com:michaelliao/bootstrap.git

一定要从自己的账号下clone仓库，这样你才能推送修改。如果从bootstrap的作者的仓库地址git@github.com:twbs/bootstrap.git克隆，因为没有权限，你将不能推送修改。

Bootstrap的官方仓库twbs/bootstrap、你在GitHub上克隆的仓库my/bootstrap，以及你自己克隆到本地电脑的仓库，他们的关系就像下图显示的那样：

![img](https:////note.youdao.com/src/1C165B0B9C724D919A71BBBAFBFBB861)

如果你想修复bootstrap的一个bug，或者新增一个功能，立刻就可以开始干活，干完后，往自己的仓库推送。

如果你希望bootstrap的官方库能接受你的修改，你就可以在GitHub上发起一个pull request。当然，对方是否接受你的pull request就不一定了。

如果你没能力修改bootstrap，但又想要试一把pull request，那就Fork一下我的仓库：https://github.com/michaelliao/learngit，创建一个your-github-id.txt的文本文件，写点自己学习Git的心得，然后推送一个pull request给我，我会视心情而定是否接受。

小结

- 在GitHub上，可以任意Fork开源仓库；
- 自己拥有Fork后的仓库的读写权限；
- 可以推送pull request给官方仓库来贡献代码。

**13、忽略特殊文件**

自己定义的文件，最终得到一个完整的.gitignore文件，内容如下：

*# Windows:* Thumbs.db ehthumbs.db Desktop.ini *# Python:* *.py[cod] *.so *.egg *.egg-info dist build *# My configurations:* db.ini deploy_key_rsa

最后一步就是把.gitignore也提交到Git，就完成了！当然检验.gitignore的标准是git status命令是不是说working directory clean。

使用Windows的童鞋注意了，如果你在资源管理器里新建一个.gitignore文件，它会非常弱智地提示你必须输入文件名，但是在文本编辑器里“保存”或者“另存为”就可以把文件保存为.gitignore了。

有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了：

$ git add App.**class** **The following paths are ignored by one of your .gitignore files:** App.**class** **Use -f if you really want to add them.**

如果你确实想添加该文件，可以用-f强制添加到Git：

$ git add -f App.**class**

或者你发现，可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用git check-ignore命令检查：

$ git check-ignore -v App.**class** **.gitignore:3:\*.class    App.class**

Git会告诉我们，.gitignore的第3行规则忽略了该文件，于是我们就可以知道应该修订哪个规则。

**14、配置别名**

$ git config --global **alias**.st status

$ git config --global **alias**.co checkout $ git config --global **alias**.ci commit $ git config --global **alias**.br branch

$ git config --global **alias**.unstage 'reset HEAD'

$ git config --global **alias**.last 'log -1'

**15、与多个远程仓库连接**

和GitHub相比，码云也提供免费的Git仓库。此外，还集成了代码质量检测、项目演示等功能。对于团队协作开发，码云还提供了项目管理、代码托管、文档管理的服务，5人以下小团队免费。

 码云的免费版本也提供私有库功能，只是有5人的成员上限。

使用码云和使用GitHub类似，我们在码云上注册账号并登录后，需要先上传自己的SSH公钥。选择右上角用户头像 -> 菜单“修改资料”，然后选择“SSH公钥”，填写一个便于识别的标题，然后把用户主目录下的.ssh/id_rsa.pub文件的内容粘贴进去：

![img](https:////note.youdao.com/src/4901B6ED49374BF89D707EF33F378C09)

点击“确定”即可完成并看到刚才添加的Key：

![img](https:////note.youdao.com/src/781C3B0C97D744C7AAACA41323AE40D8)

如果我们已经有了一个本地的git仓库（例如，一个名为learngit的本地库），如何把它关联到码云的远程库上呢？

首先，我们在码云上创建一个新的项目，选择右上角用户头像 -> 菜单“控制面板”，然后点击“创建项目”：

![img](https:////note.youdao.com/src/E0E91195CFEE461D961F476036EF5D1E)

项目名称最好与本地库保持一致：

然后，我们在本地库上使用命令git remote add把它和码云的远程库关联：

git remote add origin git@gitee.com:liaoxuefeng/learngit.git

之后，就可以正常地用git push和git pull推送了！

如果在使用命令git remote add时报错：

git remote add origin git@gitee.com:liaoxuefeng/learngit.git fatal: remote origin already exists.

这说明本地库已经关联了一个名叫origin的远程库，此时，可以先用git remote -v查看远程库信息：

git remote -v origin    git@github.com:michaelliao/learngit.git (fetch) origin    git@github.com:michaelliao/learngit.git (push)

可以看到，本地库已经关联了origin的远程库，并且，该远程库指向GitHub。

我们可以删除已有的GitHub远程库：

git remote rm origin

再关联码云的远程库（注意路径中需要填写正确的用户名）：

git remote add origin git@gitee.com:liaoxuefeng/learngit.git

此时，我们再查看远程库信息：

git remote -v origin    git@gitee.com:liaoxuefeng/learngit.git (fetch) origin    git@gitee.com:liaoxuefeng/learngit.git (push)

现在可以看到，origin已经被关联到码云的远程库了。通过git push命令就可以把本地库推送到Gitee上。

有的小伙伴又要问了，一个本地库能不能既关联GitHub，又关联码云呢？

答案是肯定的，因为git本身是分布式版本控制系统，可以同步到另外一个远程库，当然也可以同步到另外两个远程库。

使用多个远程库时，我们要注意，git给远程库起的默认名称是origin，如果有多个远程库，我们需要用不同的名称来标识不同的远程库。

仍然以learngit本地库为例，我们先删除已关联的名为origin的远程库：

git remote rm origin

然后，先关联GitHub的远程库：

git remote add github git@github.com:michaelliao/learngit.git

注意，远程库的名称叫github，不叫origin了。

接着，再关联码云的远程库：

git remote add gitee git@gitee.com:liaoxuefeng/learngit.git

同样注意，远程库的名称叫gitee，不叫origin。

现在，我们用git remote -v查看远程库信息，可以看到两个远程库：

git remote -v gitee    git@gitee.com:liaoxuefeng/learngit.git (fetch) gitee    git@gitee.com:liaoxuefeng/learngit.git (push) github    git@github.com:michaelliao/learngit.git (fetch) github    git@github.com:michaelliao/learngit.git (push)

如果要推送到GitHub，使用命令：

git push github master

如果要推送到码云，使用命令：

git push gitee master

这样一来，我们的本地库就可以同时与多个远程库互相同步：

┌─────────┐ ┌─────────┐ │ GitHub  │ │  Gitee  │ └─────────┘ └─────────┘     ▲           ▲     └─────┬─────┘           │    ┌─────────────┐    │ Local Repo  │    └─────────────┘