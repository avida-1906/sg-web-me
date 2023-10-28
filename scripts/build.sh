#!/bin/bash
set -e

if [ -n "$(git status -s)" ]
then
    echo "本地有未提交的代码，请先提交代码"
    exit 1
fi

git pull origin master --no-rebase

# 服务器地址
serverDir="/home/rocky/sg/html/member"
# 服务器ip
serverIp="43.198.7.164"
# fat 服务器ip
fatServerIp="43.198.40.130"
# 服务器用户名
serverUser="rocky"

env=$1

if [ ! -n "$env" ]
then
    env="test"
fi

if [ $env != "test" ] && [ $env != "prod" & ] && [ $env != "fat" ]
then
    echo "环境参数错误，请重新输入 [test, prod, fat]"
    read env
fi

echo "当前环境为：$env"
echo "开始构建..."
if [ $env == "test" ]
then
    pnpm build:test
fi

if [ $env == "prod" ]
then
    pnpm build:prod
fi

if [ $env == "fat" ]
then
    pnpm build:fat
fi

echo "构建完成"

# echo "开始删除服务器文件..."
# ssh rocky@@43.198.7.164 "rm -rf /home/rocky/sg/html/member/*"
# echo "删除完成"

echo "开始上传..."
if [ $env == "test" ]
then
    rsync -avz ./dist/* $serverUser@$serverIp:$serverDir
fi

if [ $env == "prod" ]
then
    rsync -avz ./dist/* $serverUser@$serverIp:$serverDir
fi

if [ $env == "fat" ]
then
    rsync -avz ./dist/* $serverUser@$fatServerIp:$serverDir
fi
echo "上传完成"
