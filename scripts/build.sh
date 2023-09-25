#!/bin/bash
set -e

# 服务器地址
serverDir="/home/rocky/sg/html/member"
# 服务器ip
serverIp="43.198.7.164"
# 服务器用户名
serverUser="rocky"

# 环境有 test, prod
map=(["test"]="build:test" ["prod"]="build:prod")

env=$1

if [ ! -n "$env" ]
then
    env="test"
fi

if [ $env != "test" ] && [ $env != "prod" ]
then
    echo "环境参数错误，请重新输入 [test, prod]"
    read env
fi

echo "当前环境为：$env"
echo "开始构建..."
pnpm ${map[$env]}
echo "构建完成"

# echo "开始删除服务器文件..."
# ssh rocky@@43.198.7.164 "rm -rf /home/rocky/sg/html/member/*"
# echo "删除完成"

echo "开始上传..."
rsync -avz ./dist/* $serverUser@$serverIp:$serverDir
echo "上传完成"