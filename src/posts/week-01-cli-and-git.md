---
title: Week 1 走完，我的命令行 + Git 指南（含踩坑）
date: "2026-06-15"
description: 从 GitHub Desktop 到命令行发 PR，一周的学习路径和 5 个真实踩坑。
tags: [命令行, Git]
---

# Week 1 走完，我的命令行 + Git 指南（含踩坑）

> 写给：用 GUI 工具但想学命令行的前端 / Vue 开发者
> 阅读时间：约 8 分钟
> 学习日志仓库：[ai-frontend-journey](https://github.com/pipixiayoudianpi/ai-frontend-journey)

---

## 这是怎么开始的

用了 2 年 GitHub Desktop，命令行只会 `cd` 和 `ls`，从没用过 `rebase`，连一个公开仓库都没有。

一周后，我能在命令行里发 PR、手动解决 merge conflict、用 `git rebase -i` 把一堆 wip commit 压成一条。

不是写来吹牛——是把过程沉淀成路径，给一周前的我那种人参考。文章结尾有完整速查表的仓库链接，急着抄答案的可以直奔结尾。

我是一名初级前端工程师，接近 2 年 toB SaaS 经验，公司项目用 Vue 2 + Options API。这是我转型 AI 应用前端 28 周计划的 Week 1 公开复盘。

---

## Day 1：花 30 分钟把终端升级一次

很多人卡在命令行学习的第一步：**默认 macOS Terminal 太丑、太弱，劝退**。

第一天就把环境一次升级到位。后面所有学习的体验感都靠这一步：

```bash
# 1. iTerm2（替代 macOS 自带 Terminal）
# 官网下载，拖进 Applications

# 2. Homebrew（macOS 包管理器，类似手机 App Store）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 3. oh-my-zsh（zsh 配置框架）
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 4. powerlevel10k（漂亮提示符，自带 Git 状态可视化）
brew install romkatv/powerlevel10k/powerlevel10k

# 5. 两个 zsh 神器插件
brew install zsh-autosuggestions zsh-syntax-highlighting
```

接进 `.zshrc` 启用，跑 `source ~/.zshrc`，提示符瞬间换装。

**这两个插件值得单独说一下**：
- **zsh-autosuggestions**：根据历史命令在你输入时灰色显示建议，按 `→` 采纳
- **zsh-syntax-highlighting**：实时给命令上色——存在的命令变绿，不存在的变红

回车前就能看出 `gti status` 写错了——拼写错误成本从"按回车被骂"降到"敲到一半就发现"，**对从 GUI 转命令行的人特别友好**。

---

## Day 2-3：30 个命令的"分组学法"

新手最容易犯的错是**按字母表死背**——查到一个记一个，第二天忘 90%。

正确做法是**按场景分组**，每组的命令都解决同一类问题。我把 30 个命令分成 6 组：

### Group 1：文件和目录
`pwd` `ls` `cd` `mkdir` `touch` `cp` `mv` `rm`

回答四个问题：我在哪？看周围？怎么走？怎么造 / 搬 / 删？

关键技巧：`ls -la` 看权限和隐藏文件、`mkdir -p a/b/c` 递归建目录、`cd -` 在两个目录之间反复横跳。

### Group 2：查看文件
`cat` `less` `head` `tail` `tail -f`

按场景选：短文件 `cat` 一口闷、长文件 `less` 分页（按 `/` 搜索、`q` 退出）、看日志 `tail -f` 实时跟踪。

### Group 3：搜索
`find` `grep` `rg`（ripgrep）`fd`

`find` 找文件本身，`grep` 找文件里的内容。前端日常 grep 比 find 用得多。

**反直觉收获**：`ripgrep`（命令 `rg`）比 `grep` 快 5-10 倍，默认自动读 `.gitignore` 排除 `node_modules`、`dist`、`.git` 这类垃圾目录。前端项目里基本是首选。

### Group 4：管道和重定向
`|` `>` `>>` `2>` `&>` `/dev/null` + `wc` `sort` `uniq` `awk` `xargs`

**Unix 的灵魂**：每个工具只做一件事，用管道串起来做复杂事。

一个 5 命令管道的例子（统计每种文件扩展名的数量）：

```bash
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn
```

第一次看会有点懵，拆开看每段：找文件 → 提取扩展名 → 排序 → 计数 → 按数量逆序。**就是 5 个小工具的流水线**，没有魔法。

### Group 5：进程和端口
`ps aux` `lsof -i :port` `kill`

前端日常救命组。每次 dev server 报 `EADDRINUSE: :::3000`，这条神器组合 30 秒解决：

```bash
lsof -ti :3000 | xargs kill
```

含义是"找出占 3000 端口的进程 PID、传给 kill"。记下来，会用一辈子。

### Group 6：环境变量和网络
`echo $PATH` `which` `export` `curl` + `jq`

`curl` 是命令行 HTTP 客户端，调 API 的入门工具。我用 `curl -s + jq` 从 GitHub API 拉了 anthropics 组织的数据：

```bash
curl -s https://api.github.com/users/anthropics | jq '.name, .public_repos, .followers'
```

——以后调大模型 API 的 curl 命令也是这个套路。

---

## Day 4-5：从 GitHub Desktop 到 PR

这是 Week 1 的核心。命令行只是工具，**Git 工作流才是协作开发的语言**。

### 最值钱的心智模型：Git 三区

很多人用 Git 几年还把它当成"加文件 + 写 message + 上传"。下面这个模型至少能解释 80% 的 Git 命令：

```
   你看到的代码（工作区）
              ↓ git add（"放进购物车"）
       暂存区（staging / index）
              ↓ git commit（"结账"）
       仓库（repository / commits）
```

**暂存区**让你能精挑细选——改了 5 个文件但只想 commit 其中 3 个，剩下 2 个等会儿一起。GitHub Desktop 的"勾选要包含的文件"实际就是在操作暂存区。

理解三区之后，**撤销不是命令，是"反向跨区"**：

| 想撤销什么 | 命令 |
|------------|------|
| 改了文件，没 add，丢弃 | `git restore <file>` |
| 已经 add，取消暂存 | `git restore --staged <file>` |
| 撤销最近 commit，保留改动 | `git reset HEAD~1` |
| 撤销最近 commit，彻底丢弃 | `git reset --hard HEAD~1` ⚠️ |
| 改最近 commit 的 message | `git commit --amend -m "新message"` |
| 已 push 的 commit 反操作 | `git revert <hash>` |

### 分支：只是指针

误区：分支是"代码的一份副本"。
真相：分支只是一个**指针**，指向某个 commit。

`git branch feature` 几乎零成本——不复制文件、不占空间，就是创建一个新指针。这就是为什么 Git 鼓励频繁切分支：每个新功能、每个 hotfix 都该用独立分支。

### 协作的最后一公里：PR 流程

把练习仓库推上 GitHub 后，跑通了完整 PR 流程：

```bash
git switch -c feature/cli-cheatsheet
# ... 改代码、add、commit ...
git push -u origin feature/cli-cheatsheet
gh pr create --title "..." --body "..."
gh pr merge --squash --delete-branch
git pull
git fetch --prune
```

`gh` 是 GitHub 官方的 CLI 工具，省去频繁开浏览器的麻烦。`--squash --delete-branch` 是 GitHub 上最常见的合并方式——把 feature 分支上所有 commit 压成一条合到 main，然后自动删除分支。

---

## 我踩过的 5 个坑（精华部分）

这一节才是这篇文章真正的价值。这些坑没人提前告诉你，但**第一次踩到时痛到一辈子记得**。

### 坑 1：`rm -f` 静默吞掉错误

我跑过：

```bash
rm -rf src/compoents/{Button,Modal}.vue
```

终端没报任何错，我以为删了。其实 `compoents` 是 `components` 的拼写错误——路径不存在。但 **`-f`（force）的副作用是抑制"路径不存在"的报错**，所以我看到的是一片祥和。

**教训**：删普通文件就用 `rm`，不要带 `-f`。`-r` 留给真的要删目录、`-f` 留给"我百分百确定这是要永久删的"。删的时候多打几个字符让自己看清楚，比静默错过强。

### 坑 2：报"找不到文件"，但其实是父目录

跑：

```bash
echo "TODO" > src/utils/error.js
# zsh: no such file or directory: src/utils/error.js
```

第一反应是"为啥要文件存在才能写？"。其实 `>` 操作符**会创建文件**——错误的是 `src/utils/` 这个**父目录**不存在。shell 在试着进入父目录时就失败了。

**教训**：Unix 报错里"path/file 找不到"经常指的是**父目录**找不到。养成一个习惯：报错后先 `ls -la` 父目录确认存在。

### 坑 3：`amend` 跨 commit 把改动并错

amend 是"修改最近一次 commit"——但很多人忘了它**会把当前 staged 的改动合并进去**。

我犯过这种错：commit 了 `docs: 补充说明`，紧接着发现 `src/about.js` 里有 typo，直接：

```bash
echo "fixed" > src/about.js
git add src/about.js
git commit --amend --no-edit
```

结果 `docs` 那条 commit 的内容变成"README 改动 + about.js 修复"——message 是 docs，内容里却带 fix。**语义错位**。

**修复**：用 `git reset HEAD~1` 撤回那条 amend 后的 commit（保留改动），然后分两次 add + commit：

```bash
git reset HEAD~1
git add README.md && git commit -m "docs: 补充说明"
git add src/about.js && git commit -m "fix(about): 修复 typo"
```

**教训**：amend 只用于"补漏同主题的改动"——比如 commit 完发现少加了一个相关文件。**跨主题改动一律新建 commit**。

### 坑 4：`revert` + `amend` 互相搅，历史长出"两条互相抵消的 commit"

第一次练 `git revert` 时，弹出 nano 编辑器让我写 message，我没多想直接改成了 "feat(profile): 添加用户资料模块"——跟原 commit message 一样。

结果历史里出现：

```
62cfe54 feat(profile): 添加用户资料模块   ← message 是"添加"，但内容是删除（这是 revert）
65be818 feat(profile): 添加用户资料模块   ← 真正的"添加"
```

两条 message 相同、改动相反，互相抵消。`ls src/` 里 profile.js 不见了——我一度以为 Git 抽风了。

**修复**：用 `git show <hash> --stat` 看每条 commit 实际改了什么，确诊后 `git reset --hard 65be818` 拉回到正常状态。

**教训**：`git revert` 的默认 message 是 `Revert "原 message"`，**不要随便改**——那是给未来的你看的"这是一条反向 commit"的标记。

### 坑 5：`amend` 后忘了 `force push`，被远程拒绝

修了 commit message 用 amend，commit hash 变了。直接 `git push` 报：

```
! [rejected]        main -> main (non-fast-forward)
```

因为本地 `A'`（amend 后的）和远程 `A`（amend 前的）是**两条不同的 commit**——Git 看来 main 和 origin/main "分叉"了。

**修复**：

```bash
git push --force-with-lease
```

**为什么用 `--force-with-lease` 而不是 `--force`**：`--force-with-lease` 只在"远程跟你以为的状态一致"时才推，避免你 amend 期间别人偷偷推了新东西被你覆盖。**个人仓库随便用，团队仓库必须养成习惯**。

---

## 速查表 + 接下来去哪

把上面所有命令整理成了一份 markdown 速查表，开源在我的练习仓库里：

**👉 [Git 速查表 - git-practice/docs/git-cheatsheet.md](https://github.com/pipixiayoudianpi/git-practice/blob/main/docs/git-cheatsheet.md)**

后面 27 周的学习也会持续更新在这里：

**👉 [AI Frontend Journey](https://github.com/pipixiayoudianpi/ai-frontend-journey)** — 每周进度报告、笔记、踩坑

下周 Week 2 进入 TypeScript 入门 + Vue 3 Composition API 熟练化——挑一个之前用 Vue 2 写的项目，用 Vite + Vue 3 + TS + `<script setup>` + Pinia 完整重写。

---

写给同路人的话：

命令行和 Git 不是"用得熟才有资格学下一步"的前置任务，而是**一旦你跨过那一周的不适，剩下的所有学习效率都会被放大**。VS Code 的内置终端再也不会让你慌、构建报错你能从日志里读出关键行、deploy 失败你能直接 ssh 上去 grep。

工具是杠杆。这一周，我把杠杆架起来了。

---

> 这是我 AI 应用前端转型的 Week 1 复盘。下一篇会是 Week 2 的 TS + Vue 3 学习笔记。
> 想跟进可以 star 仓库 [ai-frontend-journey](https://github.com/pipixiayoudianpi/ai-frontend-journey)，或者直接在 issue 里跟我交流。
