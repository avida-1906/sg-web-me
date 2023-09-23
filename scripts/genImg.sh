#!/bin/bash
set +e



diffArr=()
pngNameList=()
# 获取git最近一次提交的图片名称，保存到arr数组中
diffArr=($(git diff --name-only HEAD^ HEAD | grep -E "\.png$"))
set -e

commitStr=$(git log -1 --pretty=%B)
# 如果diffArr数组为空，则将commitStr，通过|分割，保存到commitArr数组中
if [ ${#diffArr[@]} -eq 0 ]
then
    commitArr=(${commitStr//|/ })
    # 将commitArr数组中的每一项通过/分割，取最后一项，即图片名称，保存到diffArr数组中
    for i in ${!commitArr[@]}
    do
        diffArr[$i]=${commitArr[$i]##*/}
    done
fi

# 循环diffArr数组，将数组中的每一项通过/分割，取最后一项，即图片名称，保存到pngNameList数组中
for i in ${!diffArr[@]}
do
    pngNameList[$i]=${diffArr[$i]##*/}
done

echo "pngNameList: ${pngNameList[@]}"

# 根据指定目录下的png图片生成avif和webp格式的图片
function genImg() {
    for file in `ls $1`
    do
        if [ -d $1"/"$file ]
        then
            genImg $1"/"$file
        else
            if [[ $file =~ \.png$ ]]
            then
                # 如果当前图片 名称在pngNameList数组中，则删除原有的avif和webp格式的图片
                if [[ " ${pngNameList[@]} " =~ " ${file} " ]]
                then
                    if [ -f $1"/"${file%.*}.png.avif ]
                    then
                        rm -rf $1"/"${file%.*}.png.avif
                    fi
                    if [ -f $1"/"${file%.*}.png.webp ]
                    then
                        rm -rf $1"/"${file%.*}.png.webp
                    fi
                fi

                # 如果存在原有的avif和webp格式的图片，则跳过
                if [ -f $1"/"${file%.*}.png.avif ] && [ -f $1"/"${file%.*}.png.webp ]
                then
                    continue
                fi

                cwebp -q 85 $1"/"$file -o $1"/"${file%.*}.png.webp
            fi
        fi
    done
}

# 如果没有传入参数，则提示用户输入
if [ -z $1 ]
then
    echo "请输入要生成图片的目录"
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

genImg $path
