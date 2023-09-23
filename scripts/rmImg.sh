#!/bin/bash
set -e


# 递归删除指定目录下的所有 avif和webp格式的图片
function removeImg() {
    for file in `ls $1`
    do
        if [ -d $1"/"$file ]
        then
            removeImg $1"/"$file
        else
            if [[ $file =~ \.avif$ ]] || [[ $file =~ \.webp$ ]] || [[ $file =~ \.s.png$ ]]
            then
                rm -rf $1"/"$file
            fi
        fi
    done
}

# 如果没有传入参数，则提示用户输入
if [ -z $1 ]
then
    echo "请输入要删除图片的目录"
    read path
else
    path=$1
fi

# 如果目录不存在，则提示用户重新输入
if [ ! -d $path ]
then
    echo "目录不存在，请重新输入"
    read path
fi

removeImg $path