#!/bin/bash
set -e

env=$1

# 仓库地址
repoUrl="http://munuyk.com/sg-release/web-sg.git"
# 桌面下载目录
localRepoDir="$HOME/Desktop/work/build-file/web-sg"
# 当前目录
# currentDir=$(pwd)

# if [ -n "$(git status -s)" ]
# then
#     echo "本地有未提交的代码，请先提交代码"
#     exit 1
# fi

pnpm build:$env

# 进入 localRepoDir
cd $localRepoDir

# 拉取最新代码
echo "开始拉取最新代码..."
git pull origin main --no-rebase

cd -

# 将构建好的文件复制 localRepoDir
echo "开始复制文件..."
cp -r ./dist/* $localRepoDir

# 提交代码
echo "开始提交代码..."
git add .

git commit -m "build: $(date '+%Y-%m-%d %H:%M:%S')"

git push origin main
echo "提交完成"