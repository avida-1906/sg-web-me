#!/bin/bash
set +e



# 生成 webp，avif 格式图片

# path：要生成图片的目录，如果不传，则为../public/png
pngPath=$1
if [ ! -n "$pngPath" ]; then
  pwd=$(pwd)
  pngPath=$pwd/../public/png
fi
webpPath=$pwd/../public/webp
avifPath=$pwd/../public/avif


if [ ! -d "$pngPath" ]; then
  echo "目录不存在"
  exit 1
fi

# 递归遍历 pngPath 下的所有 png 图片，将png转换成webp
function png2webp() {
  for file in `ls $1`
  do
    if [ -d $1"/"$file ]; then
      png2webp $1"/"$file
    else
      # echo $1"/"$file
      # echo ${1/$pngPath/$webpPath}
      # echo ${file/.png/.webp}
      # 判断webp下是否存在该文件夹，不存在则创建
      if [ ! -d ${1/$pngPath/$webpPath} ]; then
        mkdir -p ${1/$pngPath/$webpPath}
      fi
      cwebp -q 80 $1"/"$file -o ${1/$pngPath/$webpPath}"/"${file/.png/.webp}
    fi
  done
}

function 

png2webp $pngPath